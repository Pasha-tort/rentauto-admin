const {Schema, model} = require('mongoose');

const SpecificationPersonal = new Schema({
    specification: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
    }
});


module.exports = model('SpecificationPersonal', SpecificationPersonal)
