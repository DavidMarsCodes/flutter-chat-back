const { Schema, model } = require('mongoose');

const ProductDispensarySchema = Schema({


    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },

    dispensary: {
        type: Schema.Types.ObjectId,
        ref: 'Dispensary',
        required: true
    },

    quantity: {

        type: Number,
        require: false,
        default: 0
    }



},

    {
        timestamps: true
    });

ProductDispensarySchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('ProductDispensary', ProductDispensarySchema);