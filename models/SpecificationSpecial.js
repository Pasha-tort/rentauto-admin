const {Schema, model} = require('mongoose');

const SpecificationSpecial = new Schema({
    specification: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true,
    }
});


module.exports = model('SpecificationSpecial', SpecificationSpecial)
