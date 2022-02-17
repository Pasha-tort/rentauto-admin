const {Schema, model} = require('mongoose');

const Question = new Schema({
    title: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true,
    }
});


module.exports = model('Question', Question)