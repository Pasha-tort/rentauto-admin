const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const router = Router();

const pathViews = path.resolve(path.dirname(path.dirname(__dirname))) + '/views';
const pathPublic = path.resolve(path.dirname(path.dirname(__dirname))) + '/public';

async function writeFile(path, data, cb) {
	return new Promise((res, rej) => {
		fs.writeFile(path, data, (err) => {
			if (err) { rej() };
			console.log('Write file completed')
			res()
		})
	})
}

router.get('/', async (req, res) => {
	try {
		res.sendFile(pathPublic + '/admin.html');
	} catch (e) {
		console.log(e)
	}
})

router.post('/saveChanges', async (req, res) => {
	const { nameFile, html } = req.body;

	try {
		await writeFile(
			pathViews + `/partials/${nameFile}.hbs`,
			html,
		)
		console.log('finish')
		res.json()
	} catch (e) {
		console.log(e)
	}
})

router.get('/pagesList', async (req, res) => {
	try {
		function readFiles(path) {
			return new Promise((resolve, reject) => {
				fs.readdir(path, (err, files) => {
					if (err) {
						reject()
					} else {
						resolve(files)
					}
				})
			})
		}
		readFiles(pathViews)
			.then(files => {
				const filesFilter = files.filter(file => {
					if (file !== 'admin.hbs') {
						return /\.\w+$/.test(file)
					}
				})
				res.json(filesFilter)
			})
			.catch(() => {
				throw new Error('Ошибка чтения каталога')
			})
	} catch (e) {
		console.log(e)
	}
});

router.post('/createNewPage', async (req, res) => {
	const { fileName } = req.body;
	try {
		// let pages;
		// await fs.readdir(pathViews, (err, files) => {
		// 	if (err) {
		// 		throw new Error('Ошибка прочтения каталога')
		// 	}
		// 	return new Promise((resolve, reject) => {
		// 		resolve(files)
		// 	})
		// });

		// await pages.forEach(page => {
		// 	if (page === fileName + '.hbs') {
		// 		res.send()
		// 	}
		// })

		await fs.writeFile(
			pathViews + `/${fileName}.hbs`,
			'',
			(err) => {
				if (err) throw new Error('Ошибка создания новой страницы')
				console.log('Страница создана')
			}
		);

		await res.json(`${fileName}.hbs`)
	} catch (e) {
		console.log(e)
	}
})

module.exports = router