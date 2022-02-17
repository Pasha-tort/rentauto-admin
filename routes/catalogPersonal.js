const {Router} = require('express');
const fs = require('fs');
const path = require('path');
const router = Router();
const auth = require('../middleware/auth');

const Phone = require('../models/Phone');
const SpecificationPersonal = require('../models/SpecificationPersonal');
const MachinePersonal = require('../models/MachinePersonal');
const CatalogTitle = require('../models/CatalogTitle');

const {deletePhoto} = require('../utils/deletefPhoto');
const {fileAvailability} = require('../utils/fileAvailability');

const imgFormUrl            = '/img/catalog/personal/feedback.webp';
const imgBackgroundStyle    = 'catalog__personal';
const isCatalog             = true;
const isCatalogPersonal     = true;

const data = {
    imgFormUrl,
    imgBackgroundStyle,
}

const pathAdminPublic = path.resolve(path.dirname(__dirname)) + '/adminPublic';

router.get('/', async(req, res) => {

    try {
        const phones = await Phone.find().lean();
        const machines = await MachinePersonal.find().lean();
        const catalogTitle = await CatalogTitle.findOne({type: 'personal'}).lean();

		function readFiles(path) {
			return new Promise((res, rej) => {
				fs.readdir(path, (err, files) => {
					if (err) {
						rej()
					} else {
						res(files)
					}
				});
			})
		}

		let fileScript = null;

		await readFiles(pathAdminPublic)
			.then(res => {
				files = res.forEach((file) => {
					if (/^catalog\.\w+.js$/g.test(file)) {
						fileScript = file;
					}
				})
			})

        machines.forEach( async(item) => {
            if (item.photo.length === 0 && item.avatar !== '/img/catalog/emptyPhoto2.png') {
                item.avatar = '/img/catalog/emptyPhoto2.png';
                const avatar = item.avatar;
                await MachineCommercial.findByIdAndUpdate(item._id, {avatar});
            }
        });

        machines.forEach( async(item) => {
			
            if ( (item.photo.length === 0 && item.avatar !== '/img/catalog/emptyPhoto2.png') || !fileAvailability(item.avatar)) {
                item.avatar = '/img/catalog/emptyPhoto2.png'
                const avatar = item.avatar;
                await MachinePersonal.findByIdAndUpdate(item._id, {avatar});
            }
        });
		console.log(fileScript)
        res.render('catalog', {
            isCatalogPersonal,
			fileScript,
            isCatalog,
            phones,
            catalogTitle,
            data,
            machines,
            errorPhoneType: req.flash('errorPhoneType'),
            errorPhoneLength: req.flash('errorPhoneLength'),
            errorSpecificationType: req.flash('errorSpecificationType'),
        });
    } catch(e) {
        console.log(e)
    }
});

router.get('/specifications', auth, async(req, res) => {
    try {
        const specifications = await SpecificationPersonal.find().lean();
        res.status(200).json(specifications)
    } catch(e) {
        console.log(e)
    }
});

router.get('/specifications/:id', auth, async(req, res) => {

    const id = req.params.id;

    try {

        const specifications = await MachinePersonal.findById(id).lean().select('specifications');

        await res.json(specifications);

    } catch(e) {
        console.log(e);
    }
});

router.get('/:id', async(req, res) => {

    const isDetails = true;

    const id = req.params.id;
    const type = 'personal';

    try {
        const phones = await Phone.find().lean();
        const machine = await MachinePersonal.findById(id).lean();

		function readFiles(path) {
			return new Promise((res, rej) => {
				fs.readdir(path, (err, files) => {
					if (err) {
						rej()
					} else {
						res(files)
					}
				});
			})
		}

		let fileScript = null;

		await readFiles(pathAdminPublic)
			.then(res => {
				files = res.forEach((file) => {
					if (/^details\.\w+.js$/g.test(file)) {
						fileScript = file;
					}
				})
			})

        let mainPhoto = '/img/catalog/emptyPhoto2.png';

        if (!machine.photo.length) {
            mainPhoto = '/img/catalog/emptyPhoto2.png';
        } else {
            mainPhoto = machine.photo[0].destination + '/' + machine.photo[0].filename;
        }

        res.render('details', {
            isDetails,
			fileScript,
            phones,
            machine,
            mainPhoto,
            type,
        })
    } catch(e) {
        console.log(e)
    }
});

router.get('/photo/:id', auth, async(req, res) => {
    const id = req.params.id;
    
    try {
        const photo = await MachinePersonal.findById(id).lean().select('photo')
        res.json(photo)
    } catch (e) {
        console.log(e)
    }
});

router.post('/add-specification', auth, async(req, res) => {

    const {urlPrev} = req.body;
    let specification = req.body.specification.trim();
    const priority = req.body.priority;
    specification = specification[0].toUpperCase() + specification.substring(1);

    if (!Number(priority)) {
        req.flash('errorSpecificationType', 'Значение приоритетности должно быть цифрой')
        return res.redirect(urlPrev);
    }

    try {
        const specificationDB = new SpecificationPersonal({specification, priority});
        await specificationDB.save();

        await res.status(200).redirect('/catalog/personal/');
    } catch(e) {
        console.log(e)
    }
})

router.post('/edit-specifications', auth, async(req, res) => {
    
    const {id, specifications, prioritys, urlPrev} = req.body;
    
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
            const newSpecification = {specification: specifications[i], priority: prioritys[i]};
            await SpecificationPersonal.findByIdAndUpdate(id, newSpecification);
        })
    
        res.redirect('/catalog/personal/')

    } catch(e) {
        console.log(e)
    }
});

router.post('/edit-specifications/:id', auth, async(req, res) => {
    const {id} = req.params;
    
    const {specificationsNewValue, specificationsName, availability, price, nameMachine} = req.body;

    const specifications = [];

    specificationsName.forEach((item, i) => {
        if (specificationsNewValue[i] !== '') {
            specifications.push({
                specificationName: item,
                specificationValue: specificationsNewValue[i],
            });
        }
    });

    await MachinePersonal.findByIdAndUpdate(id, {specifications, availability, price, nameMachine});

    await res.redirect('/catalog/personal'+'/'+id);
});

router.delete('/delete-machine/:id', async(req, res) => {
    const {id} = req.params;

    try {
		const machine = await MachinePersonal.findById(id).lean();

		await machine.photo.forEach( async(photo) => {
			const {filename} = photo;

			deletePhoto(filename)
		});
		
        await MachinePersonal.deleteOne({
            _id: id,
        });

        await res.status(200).json();
    } catch (e) {
        console.log(e)
    }
});

router.delete('/specifications/remove/:id', auth, async(req, res) => {
    const id = req.params.id;

    try {

		const specificationId = await SpecificationPersonal.findById(id);

		const machines = await MachinePersonal.find().lean();
		
		for (machine of machines) {

			const newSpecifications = machine.specifications.filter(specification => {
				return specification.specificationName !== specificationId.specification;
			});

			await MachinePersonal.findByIdAndUpdate(machine._id, {
				specifications: newSpecifications
			});

			await SpecificationPersonal.deleteOne({
				_id: id,
			});
		}
    
        await res.status(200).json();
    } catch(e) {
        console.log(e)
    }
});

router.delete('/delete-photo/:id/:filename', auth, async(req, res) => {
    const fileName = req.params.filename;
    const id = req.params.id;

    try {
        // await fs.unlink('assets/img/catalog/personal/machines'+'/'+fileName, (err) => {
        //     if (err) {
        //         throw err
        //     } else {
        //         console.log('deleted' + fileName);
        //     }
        // });
		await deletePhoto(fileName)

        const photoOld = await MachinePersonal.findById(id).lean().select('photo');
        
        const photo = photoOld.photo.filter(item => {
            return item.filename !== fileName;
        });

        await MachinePersonal.findByIdAndUpdate(id, {photo});

        await res.json();
    } catch(e) {
        console.log(e)
    }
});

router.post('/avatar-photo/:id/:filename', auth, async(req, res) => {
    const fileName = req.params.filename;
    const id = req.params.id;

    const avatar = '/img/catalog/personal/machines'+'/'+fileName;

    try {
        await MachinePersonal.findByIdAndUpdate(id, {avatar});
        await res.json();
    } catch(e) {
        console.log(e);
    }
});

router.post('/add-machine', auth, async(req, res) => {
    const {specificationsValue, specificationsName, nameMachine, price, availability} = req.body;
    
    const specifications = [];
    const photos = [];
    const avatar = '/img/catalog/emptyPhoto2.png';

    if (specificationsValue.length) {
        for (let i = 0; i < specificationsValue.length; i++) {

            if (specificationsValue[i] === '') {
                continue;
            } else {
                specifications.push({
                    specificationName: specificationsName[i],
                    specificationValue: specificationsValue[i],
                })
            }
        }
    }

    try {
        const machine = new MachinePersonal({specifications, nameMachine, price, availability, photos, avatar});

        await machine.save();
        await res.status(200).redirect('/catalog/personal/');
    } catch(e) {
        console.log(e)
    }
});

router.post('/add-photo', auth, async(req, res) => {
    const id = req.body.id;
    const newPhoto = req.files;

    newPhoto.forEach(item => {
        item.destination = item.destination.slice(6);
    });

    try {
        const photoDB = await MachinePersonal.findById(id).lean().select('photo');

        const photo = [...photoDB.photo, ...newPhoto];
        
        await MachinePersonal.findByIdAndUpdate(id, {photo});

        await res.status(200).redirect('/catalog/personal'+'/'+id);
    } catch(e) {
        console.log(e);
    }
});

module.exports = router