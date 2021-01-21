const { Schema, model } = require('mongoose');

const PlantSchema = Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    quantity: {
        type: Number,
        required: true
    },
    sexo: 
    {
        type: String,
        required: false
    },
    genotype:
    {
        type: String,
        required: false
    },
    cbd: {
        type: Number,
        required: false
    },
    thc: {
        type: Number,
        required: false
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
        required: false
    },
    pot: {
        type: Number,
        required: false
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