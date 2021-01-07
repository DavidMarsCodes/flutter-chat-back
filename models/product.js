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

    room: {
        type: Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },

    price: 
    {
        type: Number,
        required: false,
        default: 0
    },

    category: 
    {
        type: Number,
        required: false,
        default: 0
    },

    

},

{
    timestamps: true
});

ProductSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Product', ProductSchema );