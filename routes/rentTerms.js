const {Router} = require('express');
const router = Router();
const fs = require('fs');
const auth = require('../middleware/auth');

const RentTerms = require('../models/RentTerms');
const MachinePersonal = require('../models/MachinePersonal');
const MachineCommercial = require('../models/MachineCommercial');
const MachineSpecial = require('../models/MachineSpecial');


router.get('/', auth, async(req, res) => {
    
    try {
        let rentTerms = await RentTerms.find().lean();

        res.status(200).json(rentTerms)
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
});

router.post('/add-rent-term', auth, async(req, res) => {
    
    const {urlPrev} = req.body;
    let rentTerm = req.body.rentTerm.trim();
    const priority = req.body.priority;
    rentTerm = rentTerm[0].toUpperCase() + rentTerm.substring(1);

    if (!Number(priority)) {
        req.flash('errorSpecificationType', 'Значение приоритетности должно быть цифрой')
        return res.redirect(urlPrev);
    }

    try {
        const rentTermDB = new RentTerms({rentTerm, priority});
        await rentTermDB.save();

        await res.status(200).redirect(urlPrev);
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
})

router.post('/edit-rent-term', auth, async(req, res) => {

    const {id, rentTerms, prioritys, urlPrev} = req.body;
    
    let error = false;

    prioritys.forEach(priority => {
        if (!Number(priority)) {
            req.flash('errorSpecificationType', 'Значение приоритетности должно быть цифрой')
            error = true;
        }
    });

    if (error) {
        return res.redirect(urlPrev);
    }
    
    try {

        id.forEach(async(id, i) => {
            const newRentTerm = {rentTerm: rentTerms[i], priority: prioritys[i]}
            await RentTerms.findByIdAndUpdate(id, newRentTerm);
        })
    
        res.redirect(urlPrev)

    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
});

router.delete('/remove/:id', auth, async(req, res) => {
    const id = req.params.id;

    try {

		const personalMachnies = await MachinePersonal.find().lean();
		const commercialMachnies = await MachineCommercial.find().lean();
		const specialMachines = await MachineSpecial.find().lean();

		const rentTermCurrent = await RentTerms.findById(id).lean();

		function deleteRentTermsAllMachines(typeMachine, typeMachineDB) {
			typeMachine.forEach( async(machine) => {
				
				const rentTerms = machine.rentTerms.filter(item => {
					return item.rentTermsName !== rentTermCurrent.rentTerm
				});
	
				await typeMachineDB.findByIdAndUpdate(machine._id, {rentTerms});
			})
		}

		deleteRentTermsAllMachines(personalMachnies, MachinePersonal);
		deleteRentTermsAllMachines(commercialMachnies, MachineCommercial);
		deleteRentTermsAllMachines(specialMachines, MachineSpecial);

        await RentTerms.deleteOne({
            _id: id,
        });
    
        await res.status(200).json();
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
});

module.exports = router