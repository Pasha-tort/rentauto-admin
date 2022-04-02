const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const router = Router();

//halpers
const { writeFileAsync } = require('./halpers');

const pathViews = path.resolve(path.dirname(path.dirname(__dirname))) + '/views';
const pathPublic = path.resolve(path.dirname(path.dirname(__dirname))) + '/public';

router.get('/', async (req, res) => {
	try {
		res.sendFile(pathPublic + '/admin.html');
	} catch (e) {
		console.log(e);
		res.status(500);
	}
})

router.post('/saveChanges', async (req, res) => {
	const { nameFile, html } = req.body;

	try {
		await writeFileAsync(
			pathViews + `/partials/${nameFile}.hbs`,
			html,
		)
		res.status(202).json()
	} catch (e) {
		console.log(e)
		res.status(500);
	}
});

module.exports = router