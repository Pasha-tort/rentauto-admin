const {Schema, model} = require('mongoose');

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
})


module.exports = model('CatalogHomeItem', CatalogHomeItem)
