const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const router = Router();

//halpers
const { writeFileAsync } = require('./halpers');

const tempFiles = path.resolve(path.dirname(path.dirname(__dirname))) + '/admin/temp';
const rootPath = path.resolve(path.dirname(path.dirname(__dirname)));

router.post('/createTempHtml', async (req, res) => {
	const { html } = req.body;
	console.log(path.join(tempFiles, '/temp.html'))
	try {
		await writeFileAsync(
			path.join(tempFiles, '/temp.html'),
			html,
		)
		console.log('Файл HTML создан')
		res.send();
	} catch (e) {
		console.log(e);
		res.status(500);
	}
});

module.exports = router