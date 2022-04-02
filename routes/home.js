const { Router } = require('express');
const router = Router();
const path = require('path');
const fs = require('fs');

//Mongoose models
const Questions = require('../models/QuestionsModel');
const Phone = require('../models/Phone');
const Advantage = require('../models/Advantages');
const CatalogHomeItem = require('../models/CatalogHomeItem');
const Exchange = require('../models/Exchange');

//halpers
const { readFilesScripts } = require('./halpers/readFilesScripts');

const pathPublic = path.resolve(path.dirname(__dirname)) + '/public';

router.get('/', async (req, res) => {

	const isHome = true;

	try {
		const questions = await Questions.find().lean();
		const phones = await Phone.find().lean();
		const [advantageFirst, ...advantages] = await Advantage.find().lean();
		const [catalogHome1, catalogHome2, catalogHome3] = await CatalogHomeItem.find().lean();
		const [exchangeField] = await Exchange.find().lean();

		const firstBoxQuestions = questions.filter((item, i) => i % 2 === 0);
		const secondBoxQuestions = questions.filter((item, i) => i % 2 !== 0);

		let fileScript = null;

		await readFilesScripts(pathPublic, 'index')
			.then(file => {
				fileScript = file
			});

		// let fileScriptAdmin = null;

		// await readFilesScripts(pathPublic, 'adminIndex')
		// 	.then(file => {
		// 		fileScriptAdmin = file;
		// });

		res.render('index', {
			isHome,
			fileScript,
			// fileScriptAdmin,
			firstBoxQuestions,
			secondBoxQuestions,
			phones,
			exchangeField,
			advantageFirst,
			advantages,
			catalogHome1,
			catalogHome2,
			catalogHome3,
			errorPhoneType: req.flash('errorPhoneType'),
			errorPhoneLength: req.flash('errorPhoneLength'),
		})
	} catch (e) {
		console.log(e);
		res.status(404).render('404', {
			title: 'Страница не найдена'
		});
	}
})

module.exports = router