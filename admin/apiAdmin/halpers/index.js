const fs = require('fs');

async function writeFileAsync(path, data) {
	return new Promise((res, rej) => {
		fs.writeFile(path, data, (err) => {
			if (err) rej();
			console.log('Write file completed');
			res();
		});
	});
}

async function removeFileAsync(path) {
	return new Promise((res, rej) => {
		fs.unlink(path, (err) => {
			if (err) rej();
			console.log('File deleted');
			res();
		})
	})
}

async function readDir(path) {
	return new Promise((res, rej) => {
		fs.readdir(path, (err, filesPages) => {
			if (err) rej();
			res(filesPages);
		});
	});
}

async function makeDirAsync(path) {
	return new Promise((res, rej) => {
		fs.mkdir(path, (err) => {
			if (err) rej();
			console.log('Make directory completed');
			res();
		});
	});
}

function createDate(d) {
	const year = d.getFullYear();
	const month = d.getMonth() + 1;
	const day = d.getDate();
	const hours = d.getHours();
	const minutes = d.getMinutes();
	const seconds = d.getSeconds();
	const date = day + '-' + month + '-' + year + '-' + hours + '-' + minutes + '-' + seconds;

	return date;
}

function formattingStr(pathPage) {
	if (pathPage === '/') {
		return pathPage = 'home';
	} else {
		pathPage = pathPage.split('/');
		pathPage = pathPage.filter(item => {
			return item !== ''
		});
		pathPage = pathPage.join('.');
		return pathPage;
	}
}

module.exports = {
	writeFileAsync,
	removeFileAsync,
	readDir,
	makeDirAsync,
	createDate,
	formattingStr,
}