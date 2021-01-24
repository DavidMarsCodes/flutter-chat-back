const { Schema, model } = require('mongoose');

const PlantSchema = Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    quantity: {
        type: String,
        required: true
    },
    sexo: 
    {
        type: String,
        required: false,
        default: ''
    },
    genotype:
    {
        type: String,
        required: false,
        default: ''
    },
    cbd: {
        type: String,
        required: false,
        default: 0
    },
    thc: {
        type: String,
        required: false,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    germinated: {
        type: String,
        required: true
    },
    flowering: {
        type: String,
        required: true
    },
    pot: {
        type: String,
        required: false,
        default: 0
    }
    
},

{
    timestamps: true
});

PlantSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Plant', PlantSchema );