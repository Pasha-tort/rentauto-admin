const {Router} = require('express');
const fs = require('fs');
const path = require('path');
const router = Router();

const tempFiles = path.resolve(path.dirname(path.dirname(__dirname))) + '/temp';
const rootPath = path.resolve(path.dirname(path.dirname(__dirname)));

router.get('/tempHtml', async(req, res) => {
	try {
		res.sendFile(tempFiles + '/temp.html')
	} catch(e) {
		console.log(e)
	}
});

// router.get('/bundle.js', async(req, res) => {
// 	try {
// 		res.sendFile(rootPath + '/bundle.js')
// 	} catch(e) {
// 		console.log(e)
// 	}
// });
// router.get('/index.min.css', async(req, res) => {
// 	try {
// 		res.sendFile(rootPath + '/index.min.css')
// 	} catch(e) {
// 		console.log(e)
// 	}
// })

router.post('/createTempHtml', async(req, res) => {
	const {html} = req.body;

	try {
		fs.writeFile(tempFiles + '/temp.html', html, (err) => {
			if (err) throw new Error('Ошибка создания временного файла HTML')
			console.log('Файл HTML создан')
		})
		res.send();
	} catch(e) {
		console.log(e)
	}
});

module.exports = router