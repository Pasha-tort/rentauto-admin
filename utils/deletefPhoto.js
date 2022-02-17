const fs = require('fs');

async function deletePhoto(fileName) {
	await fs.unlink('assets/img/catalog/personal/machines'+'/'+fileName, (err) => {
		if (err) {
			throw err
		} else {
			console.log('deleted' + fileName);
		}
	});
}

module.exports = {
	deletePhoto
}