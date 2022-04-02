const { Schema, model } = require('mongoose');

const Page = new Schema({
	pageName: {
		type: String,
		required: true,
	},
	backups: {
		type: Array,
		required: true
	},
	activeBackups: {
		type: Array,
		required: true,
	}
})


module.exports = model('Page', Page)
