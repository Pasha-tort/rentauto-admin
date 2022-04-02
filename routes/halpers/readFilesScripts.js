const fs = require('fs');

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


function readFilesScripts(path, regexpVar) {
	return new Promise((res, rej) => {
		readFiles(path)
			.then(dir => {
				const regexp = new RegExp(`^${regexpVar}\\.\\w+.js$`, "g");
				// dir.forEach((file) => {
				// 	console.log(regexp.test(file), file, regexp)
				// 	if (regexp.test(file)) {
				// 		res(file)
				// 	}
				// })
				for (let i = 0; i < dir.length; i++) {
					const file = dir[i];
					if (regexp.test(file)) {
						res(file);
						break;
					} else {
						continue;
					}
				}
			});
	})
}

module.exports = {
	readFilesScripts
}