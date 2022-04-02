const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth');
const Phone = require('../models/Phone');

router.get('/', async(req, res) => {

    try {
        const phones = await Phone.find().lean();

        res.json(phones)
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
    
});

router.post('/add', auth, async(req, res) => {

    const {phone, urlPrev} = req.body;

    if (!Number(phone)) {
        req.flash('errorPhoneType', 'Номер должен состоять из цифр');
        return res.redirect(urlPrev)
    }

    if (phone.length !== 10) {
        req.flash('errorPhoneLength', 'Длина номера телефона должна быть 10 символов');
        return res.redirect(urlPrev)
    }

    const phoneUI = '+7' + ' (' + phone.substr(0,3) + ') ' + phone.substr(3,3) + '-' + phone.substr(6,2) + '-' + phone.substr(8,2);
    const phoneRef = '+7' + phone;

    try {
        const phoneDB = new Phone({phone: phoneRef, phoneUI});
        await phoneDB.save();

        await res.status(200).redirect(urlPrev);

    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
    
})

router.post('/edit', auth, async(req, res) => {
    const {id, phone, urlPrev} = req.body;
    
    if (!Number(phone)) {
        req.flash('errorPhoneType', 'Номер должен состоять из цифр');
        return res.redirect(urlPrev)
    }

    if (phone.length !== 10) {
        req.flash('errorPhoneLength', 'Длина номера телефона должна быть 10 символов');
        return res.redirect(urlPrev)
    }

    const phoneUI = '+7' + ' (' + phone.substr(0,3) + ') ' + phone.substr(3,3) + '-' + phone.substr(6,2) + '-' + phone.substr(8,2);
    const phoneRef = '+7' + phone;

    const newObj = {phoneUI, phone: phoneRef}

    try {
        await Phone.findByIdAndUpdate(id, newObj).lean();

        await res.status(200).redirect(urlPrev);
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
})

router.delete('/delete/:id', auth, async(req, res) => {
    const id = req.params.id;

    try {
        await Phone.deleteOne({
            _id: id
        });
    
        const phones = await Phone.find().lean();
    
        await res.status(200).json(phones)
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
})

module.exports = router