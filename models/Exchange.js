const {Schema, model} = require('mongoose');

const Exchange = new Schema({
    field: {
        type: String,
        required: true,
    }
});

module.exports = model('Exchange', Exchange);