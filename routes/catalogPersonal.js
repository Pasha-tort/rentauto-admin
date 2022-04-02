const { Router } = require('express');
const router = Router();
const fs = require('fs');
const auth = require('../middleware/auth');
const path = require('path');

//Mongoose models
const Phone = require('../models/Phone');
const SpecificationPersonal = require('../models/SpecificationPersonal');
const MachinePersonal = require('../models/MachinePersonal');
const CatalogTitle = require('../models/CatalogTitle');

//utils
const { deletePhoto } = require('../utils/deletefPhoto');
const { fileAvailability } = require('../utils/fileAvailability');

//halpers
const { readFilesScripts } = require('./halpers/readFilesScripts');

const imgFormUrl = '/img/catalog/personal/feedback.jpg';
const imgBackgroundStyle = 'catalog__personal';
const isCatalog = true;
const isCatalogPersonal = true;

const data = {
	imgFormUrl,
	imgBackgroundStyle,
}

const pathPublic = path.resolve(path.dirname(__dirname)) + '/public';

router.get('/', async (req, res) => {

	try {
		const phones = await Phone.find().lean();
		const machines = await MachinePersonal.find().lean();
		const catalogTitle = await CatalogTitle.findOne({ type: 'personal' }).lean();
		const titleTag = 'Аренда легковых машин в Москве'

		machines.forEach(async (item) => {

			if ((item.photo.length === 0 && item.avatar !== '/img/catalog/emptyPhoto2.png') || !fileAvailability(item.avatar)) {
				item.avatar = '/img/catalog/emptyPhoto2.png'
				const avatar = item.avatar;
				await MachinePersonal.findByIdAndUpdate(item._id, { avatar });
			}

			if (item.rentTerms.length) {
				item.rentTerms.sort((a, b) => {
					return +a.rentTermsMonthlyValue - +b.rentTermsMonthlyValue;
				});

				item.minRentTermsValue = item.rentTerms[0].rentTermsMonthlyValue.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
			}

			if (!isNaN(+item.price)) {
				item.price = item.price.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
				item.notPrice = false;
			} else {
				item.notPrice = true;
			}
		});

		let fileScript = null;

		await readFilesScripts(pathPublic, 'catalog')
			.then(file => {
				fileScript = file
			});

		const pathHrefCurrent = '/catalog/personal/';

		res.render('catalog', {
			titleTag,
			isCatalogPersonal,
			isCatalog,
			fileScript,
			phones,
			catalogTitle,
			data,
			machines,
			pathHrefCurrent,
			errorPhoneType: req.flash('errorPhoneType'),
			errorPhoneLength: req.flash('errorPhoneLength'),
			errorSpecificationType: req.flash('errorSpecificationType'),
			layout: 'catalog',
		});
	} catch (e) {
		console.log(e);
		res.status(404).render('404', {
			title: 'Страница не найдена'
		});
	}
});

router.get('/specifications', auth, async (req, res) => {
	try {
		const specifications = await SpecificationPersonal.find().lean();
		res.status(200).json(specifications)
	} catch (e) {
		console.log(e)
		res.status(500).json();
	}
});

router.get('/specifications/:id', auth, async (req, res) => {

	const id = req.params.id;

	try {

		const specifications = await MachinePersonal.findById(id).lean().select('specifications');

		await res.json(specifications);

	} catch (e) {
		console.log(e);
		res.status(500).json();
	}
});

router.get('/rent-terms/:id', auth, async (req, res) => {

	const id = req.params.id;

	try {
		const rentTerms = await MachinePersonal.findById(id).lean().select('rentTerms');

		await res.json(rentTerms);
	} catch (e) {
		console.log(e);
		res.status(500).json();
	}
})

router.get('/:id', async (req, res) => {

	const isDetails = true;
	let notPrice = false;

	const id = req.params.id;
	const type = 'personal';
	console.log(id)

	try {
		const phones = await Phone.find().lean();
		const machine = await MachinePersonal.findById(id).lean();

		let mainPhoto = '/img/catalog/emptyPhoto2.png';
		const titleTag = `Аренда, покупка ${machine.nameMachine}`

		if (!machine.photo.length) {
			mainPhoto = '/img/catalog/emptyPhoto2.png';
		} else {
			mainPhoto = machine.photo[0].destination + '/' + machine.photo[0].filename;
		}

		if (!isNaN(machine.price)) {
			machine.price = machine.price.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
		} else {
			notPrice = true;
		}

		if (machine.rentTerms.length) {
			machine.rentTerms.forEach(item => {
				item.rentTermsFullValue = item.rentTermsFullValue.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
				item.rentTermsMonthlyValue = item.rentTermsMonthlyValue.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
			});
		}

		let fileScript = null;

		await readFilesScripts(pathPublic, 'details')
			.then(file => {
				fileScript = file
			});

		const pathHrefPrev = '/catalog/personal/'

		res.render('details', {
			titleTag,
			isDetails,
			fileScript,
			phones,
			machine,
			notPrice,
			mainPhoto,
			type,
			pathHrefPrev,
			layout: 'details',
		})
	} catch (e) {
		console.log(e);
		res.status(404).render('404', {
			title: 'Страница не найдена'
		})
	}
});

router.get('/photo/:id', auth, async (req, res) => {
	const id = req.params.id;

	try {
		const photo = await MachinePersonal.findById(id).lean().select('photo')
		res.json(photo)
	} catch (e) {
		console.log(e)
		res.status(500).json();
	}
});

router.post('/add-specification', auth, async (req, res) => {

	const { urlPrev } = req.body;
	let specification = req.body.specification.trim();
	const priority = req.body.priority;
	specification = specification[0].toUpperCase() + specification.substring(1);

	if (!Number(priority)) {
		req.flash('errorSpecificationType', 'Значение приоритетности должно быть цифрой')
		return res.redirect(urlPrev);
	}

	try {
		const specificationDB = new SpecificationPersonal({ specification, priority });
		await specificationDB.save();

		await res.status(200).redirect('/catalog/personal/');
	} catch (e) {
		console.log(e)
		res.status(500).json();
	}
})

router.post('/edit-specifications', auth, async (req, res) => {

	const { id, specifications, prioritys, urlPrev } = req.body;

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

		id.forEach(async (id, i) => {
			const newSpecification = { specification: specifications[i], priority: prioritys[i] };
			await SpecificationPersonal.findByIdAndUpdate(id, newSpecification);
		})

		res.redirect('/catalog/personal/')

	} catch (e) {
		console.log(e)
		res.status(500).json();
	}
});

router.post('/edit-specifications/:id', auth, async (req, res) => {
	const { id } = req.params;

	const { specificationsNewValue, specificationsName, availability, nameMachine } = req.body;
	let { price, rentTermsName, rentTermsFullValue, rentTermsMonthlyValue } = req.body;

	try {
		if (typeof rentTermsFullValue === 'string') {
			rentTermsFullValue = [rentTermsFullValue];
		}

		if (typeof rentTermsName === 'string') {
			rentTermsName = [rentTermsName];
		}

		if (typeof rentTermsMonthlyValue === 'string') {
			rentTermsMonthlyValue = [rentTermsMonthlyValue];
		}

		const specifications = [];
		const rentTerms = [];

		const priceChanges = (price) => {
			return price.match(/\d+/g).join('');
		}

		if (price !== 'Цена не указана' && price !== '') {
			price = priceChanges(price);
		} else {
			price = 'Цена не указана'
		}

		specificationsName.forEach((item, i) => {
			if (specificationsNewValue[i] !== '') {
				specifications.push({
					specificationName: item,
					specificationValue: specificationsNewValue[i],
				});
			}
		});

		rentTermsName.forEach((item, i) => {
			if (rentTermsFullValue[i] !== '') {
				rentTerms.push({
					rentTermsName: item,
					rentTermsFullValue: priceChanges(rentTermsFullValue[i]),
					rentTermsMonthlyValue: priceChanges(rentTermsMonthlyValue[i]),
				})
			}
		});

		await MachinePersonal.findByIdAndUpdate(id, { specifications, availability, price, nameMachine, rentTerms });

		await res.redirect('/catalog/personal' + '/' + id);
	} catch (e) {
		console.log(e);
		res.status(500).json();
	}
});

router.delete('/delete-machine/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const machine = await MachinePersonal.findById(id).lean();

		await machine.photo.forEach(async (photo) => {
			const { filename } = photo;

			deletePhoto(filename)
		});

		await MachinePersonal.deleteOne({
			_id: id,
		});

		await res.status(200).json();
	} catch (e) {
		console.log(e)
		res.status(500).json();
	}
});

router.delete('/specifications/remove/:id', auth, async (req, res) => {
	const id = req.params.id;

	try {

		const specificationId = await SpecificationPersonal.findById(id);

		const machines = await MachinePersonal.find().lean();

		for (let machine of machines) {

			const newSpecifications = machine.specifications.filter(specification => {
				return specification.specificationName !== specificationId.specification;
			});

			await MachinePersonal.findByIdAndUpdate(machine._id, {
				specifications: newSpecifications
			});
		}

		await SpecificationPersonal.deleteOne({
			_id: id,
		});

		await res.status(200).json();
	} catch (e) {
		console.log(e)
		res.status(500).json();
	}
});

router.delete('/delete-photo/:id/:filename', auth, async (req, res) => {
	const fileName = req.params.filename;
	const id = req.params.id;

	try {
		await deletePhoto(fileName)

		const photoOld = await MachinePersonal.findById(id).lean().select('photo');

		const photo = photoOld.photo.filter(item => {
			return item.filename !== fileName;
		});

		await MachinePersonal.findByIdAndUpdate(id, { photo });

		await res.json();
	} catch (e) {
		console.log(e)
		res.status(500).json();
	}
});

router.post('/avatar-photo/:id/:filename', auth, async (req, res) => {
	const fileName = req.params.filename;
	const id = req.params.id;

	const avatar = '/img/catalog/personal/machines' + '/' + fileName;

	try {
		await MachinePersonal.findByIdAndUpdate(id, { avatar });
		await res.json();
	} catch (e) {
		console.log(e);
		res.status(500).json();
	}
});

router.post('/add-machine', auth, async (req, res) => {
	const { specificationsValue, specificationsName, nameMachine, availability } = req.body;
	let { rentTermsName, rentTermsFullValue, rentTermsMonthlyValue, price } = req.body;

	if (typeof rentTermsFullValue === 'string') {
		rentTermsFullValue = [rentTermsFullValue];
	}

	if (typeof rentTermsName === 'string') {
		rentTermsName = [rentTermsName];
	}

	if (typeof rentTermsMonthlyValue === 'string') {
		rentTermsMonthlyValue = [rentTermsMonthlyValue];
	}

	const priceChanges = (price) => {
		return price.match(/\d+/g).join('');
	}

	if (price !== '') {
		price = priceChanges(price);
	} else {
		price = 'Цена не указана'
	}

	const specifications = [];
	const photos = [];
	const avatar = '/img/catalog/emptyPhoto2.png';
	const rentTerms = [];

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

	if (rentTermsFullValue.length) {
		for (let i = 0; i < rentTermsFullValue.length; i++) {

			if (rentTermsFullValue[i] === '') {
				continue;
			} else {
				rentTerms.push({
					rentTermsName: rentTermsName[i],
					rentTermsFullValue: priceChanges(rentTermsFullValue[i]),
					rentTermsMonthlyValue: priceChanges(rentTermsMonthlyValue[i]),
				})
			}
		}
	}

	try {
		const machine = new MachinePersonal({ specifications, nameMachine, price, availability, photos, avatar, rentTerms });

		await machine.save();
		await res.status(200).redirect('/catalog/personal/');
	} catch (e) {
		console.log(e);
		res.status(500).json();
	}
});

router.post('/add-photo', auth, async (req, res) => {
	const id = req.body.id;
	const newPhoto = req.files;

	newPhoto.forEach(item => {
		item.destination = item.destination.slice(6);
	});

	try {
		const photoDB = await MachinePersonal.findById(id).lean().select('photo');

		const photo = [...photoDB.photo, ...newPhoto];

		await MachinePersonal.findByIdAndUpdate(id, { photo });

		await res.status(200).redirect('/catalog/personal' + '/' + id);
	} catch (e) {
		console.log(e);
		res.status(500).json();
	}
});

router.post('/edit-desc', auth, async (req, res) => {
	const id = req.body.id;
	const desc = req.body.desc.trim();

	try {
		await MachinePersonal.findByIdAndUpdate(id, { desc });

		res.status(200).redirect('/catalog/personal' + '/' + id);
	} catch (e) {
		console.log(e);
		res.status(500).json();
	}
});

module.exports = router