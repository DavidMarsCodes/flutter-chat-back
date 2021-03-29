const { Schema, model } = require('mongoose');

const PlantProductSchema = Schema({


    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },


    plant: {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
        required: true
    },


    position:
    {
        type: Number,
        required: false,
        default: 0
    },




},

    {
        timestamps: true
    });

PlantProductSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('PlantProduct', PlantProductSchema);