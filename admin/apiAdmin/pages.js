const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const router = Router();

//models
const Page = require('../../models/Page');

//halpers
const { writeFileAsync, makeDirAsync, createDate, readDir, formattingStr, removeFileAsync } = require('./halpers');

const pathViews = path.resolve(path.dirname(path.dirname(__dirname))) + '/views';
const pathPublic = path.resolve(path.dirname(path.dirname(__dirname))) + '/public';
const pathDataPages = path.resolve(path.dirname(path.dirname(__dirname))) + '/data/pages';

const receivingDir = (fileName) => {
	let dir = fileName.match(/\(.+\)/)[0];
	dir = dir.slice(1, dir.length - 1);
	return dir;
}

router.get('/backupFile', async (req, res) => {
	try {
		const { page } = req.query;

		pathPage = formattingStr(page);

		const currentPage = await Page.findOne({ pageName: pathPage }).lean();

		res.json(currentPage);
	} catch (e) {
		console.log(e);
		res.status(500).send();
	}
});

router.post('/selectBackup', async (req, res) => {
	try {
		const { fileName } = req.query;
		let { date } = req.query;

		date = date.split(',');
		date = date.map(item => {
			return item.trim();
		});
		date = date.join("/");

		let dir = receivingDir(fileName);

		const page = await Page.findOne({ pageName: dir });

		const activeBackups = [...page.activeBackups, { fileName, date }];

		await Page.updateOne({ pageName: dir }, { activeBackups });

		res.status(202).sendFile(path.join(pathDataPages, dir, `${fileName}.html`));
	} catch (e) {
		console.log(e);
		res.status(500).send();
	}
})

router.post('/createBackup', async (req, res) => {
	try {
		const { html } = req.body;
		let { pathPage, date } = req.body;

		pathPage = formattingStr(pathPage);

		date = date.split(',');

		date = date.map(item => {
			return item.trim();
		});

		let dateFileName = date.map(item => {
			return item.replace(/:/g, '.')
		});

		date = date.join("/")

		dateFileName = dateFileName.join(".");

		const page = await Page.findOne({ pageName: pathPage }).lean();

		if (page) {
			const backups = [...page.backups, { date, fileName: `nameFile(${pathPage})${dateFileName}` }];
			const activeBackups = [...page.activeBackups, { date, fileName: `nameFile(${pathPage})${dateFileName}` }]
			await Page.updateOne({ pageName: pathPage }, { backups, activeBackups });
		} else {
			const newPage = await new Page({
				pageName: pathPage,
				backups: [
					{
						date,
						fileName: `nameFile(${pathPage})${dateFileName}`,
					},
				],
				activeBackups: [
					{
						date,
						fileName: `nameFile(${pathPage})${dateFileName}`,
					},
				],
			});

			await newPage.save();
		}

		const dirCheck = fs.existsSync(path.join(pathDataPages, pathPage));
		const nameFile = `nameFile(${pathPage})${dateFileName}.html`;

		if (dirCheck) {
			await writeFileAsync(
				path.join(pathDataPages, pathPage, nameFile),
				html,
			)
		} else {
			await makeDirAsync(path.join(pathDataPages, pathPage));
			await writeFileAsync(
				path.join(pathDataPages, pathPage, nameFile),
				html,
			)
		}

		res.status(201).json();
		res.status(500).send();

	} catch (e) {
		console.log(e)
	}
});

router.delete('/removeBackup', async (req, res) => {
	try {
		const { backupFile } = req.query;

		const dir = receivingDir(backupFile);
		await removeFileAsync(path.join(pathDataPages, dir, `${backupFile}.html`));

		const page = await Page.findOne({ pageName: dir }).lean();

		const backups = page.backups.filter(item => {
			return item.fileName !== backupFile;
		});

		const activeBackups = page.activeBackups.filter(item => {
			return item.fileName !== backupFile;
		});

		await Page.findOneAndUpdate({ pageName: dir }, { backups, activeBackups });

		res.status(201).send();

	} catch (e) {
		console.log(e);
		res.status(500).send();
	}
})

module.exports = router;