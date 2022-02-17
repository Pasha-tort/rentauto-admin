const fs = require('fs');

function fileAvailability(filePath) {
	try {
		const exists = fs.existsSync(filePath);
		return exists;
	} catch (e) {
		console.log(e);
	}
}

module.exports = {
	fileAvailability
};