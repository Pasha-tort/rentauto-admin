const {Schema, model} = require('mongoose');

const Phone = new Schema({
    phone: {
        type: String,
        required: true
    },
    phoneUI: {
        type: String,
        required: true,
    }
})


module.exports = model('Phone', Phone)