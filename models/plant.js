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
        type: Number,
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
        type: Number,
        required: false,
        default: 0
    },
    thc: {
        type: Number,
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
        type: Date,
        required: true
    },
    flowering: {
        type: Date,
        required: true
    },
    pot: {
        type: Number,
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