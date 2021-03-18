const { Schema, model } = require('mongoose');

const ProductSchema = Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    catalogo: {
        type: Schema.Types.ObjectId,
        ref: 'Catalogo',
        required: true
    },

    price:
    {
        type: Number,
        required: false,
        default: 0
    },

    coverImage: {
        type: String,
        required: false,
        default: ''
    },

    ratingInit: {

        type: String,
        require: false,
        default: '0'
    },

    cbd: {
        type: String,
        required: false,
        default: ''
    },
    thc: {
        type: String,
        required: false,
        default: ''
    },





},

    {
        timestamps: true
    });

ProductSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Product', ProductSchema);