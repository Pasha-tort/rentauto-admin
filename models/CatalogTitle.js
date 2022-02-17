const {Schema, model} = require('mongoose');

const CatalogTitle = new Schema({
    pageName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    }
})


module.exports = model('CatalogTitle', CatalogTitle)
