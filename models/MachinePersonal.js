const {Schema, model} = require('mongoose');

const MachinePersonal = new Schema({
    photo: {
        type: Array,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    specifications: {
        type: Array,
        required: false,
    },
    nameMachine: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
    }
});


module.exports = model('MachinePersonal', MachinePersonal)
