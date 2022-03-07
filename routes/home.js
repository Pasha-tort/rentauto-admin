const {Router} = require('express');
const router = Router();
const fs = require('fs');
const path = require('path');

const Questions = require('../models/QuestionsModel');
const Phone = require('../models/Phone');
const Advantage = require('../models/Advantages');
const CatalogHomeItem = require('../models/CatalogHomeItem');
const Exchange = require('../models/Exchange');

const pathPublic = path.resolve(path.dirname(__dirname)) + '/public';

router.get('/', async(req, res) => {

    const isHome = true;

    try {
        const questions = await Questions.find().lean();
        const phones = await Phone.find().lean();
        const [advantageFirst, ...advantages] = await Advantage.find().lean();
        const [catalogHome1, catalogHome2, catalogHome3] = await CatalogHomeItem.find().lean();
        const [exchangeField] = await Exchange.find().lean();

        const firstBoxQuestions = questions.filter((item, i) => i % 2 === 0);
        const secondBoxQuestions = questions.filter((item, i) => i % 2 !== 0);

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

		await readFiles(pathPublic)
			.then(res => {
				files = res.forEach((file) => {
					if (/^index\.\w+.js$/g.test(file)) {
						fileScript = file;
					}
				})
			})

        res.render('index', {
            isHome,
			fileScript,
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
    } catch(e) {
        console.log(e)
    }
})

module.exports = router