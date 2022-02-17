const {Schema, model} = require('mongoose');

const SpecificationCommercial = new Schema({
    specification: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
    }
});


module.exports = model('SpecificationCommercial', SpecificationCommercial)
