const { Schema, model } = require('mongoose');

const CatalogoSchema = Schema({

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

    position: 
    {
        type: Number,
        required: false,
        default: 0
    },

    privacity:

    {
        type: String,
        required: false,
        default: '1'
    },

    totalProducts: 
    {
        type: Number,
        required: false,
        default: 0
    },


},

{
    timestamps: true
});

CatalogoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Catalogo', CatalogoSchema );