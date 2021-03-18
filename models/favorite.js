const { Schema, model } = require('mongoose');

const FavoriteSchema = Schema({


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

    isLike: {

        type: Boolean,
        required: false,
        default: false
    }







},

    {
        timestamps: true
    });

FavoriteSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Favorite', FavoriteSchema);