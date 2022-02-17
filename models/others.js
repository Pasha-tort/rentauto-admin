const {Schema, model} = require('mongoose');

const Advantage = new Schema({
    title: {
        type: String,
        required: true,
    },
    field: {
        type: String,
        required: true
    },
    urlImg: {
        type: String,
        required: true,
    }
});

const CatalogHomeItem = new Schema({
    title: {
        type: String,
        required: true,
    },
    field: {
        type: String,
        required: true
    },
    urlImg: {
        type: String,
        required: true,
    }
});

const Phone = new Schema({
    phone: {
        type: String,
        required: true
    },
    phoneUI: {
        type: String,
        required: true,
    }
});

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

module.exports = model('Phone', Phone);
module.exports = model('Advantage', Advantage);
module.exports = model('CatalogHomeItem', CatalogHomeItem);
module.exports = model('Question', Question);
