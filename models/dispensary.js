const { Schema, model } = require('mongoose');

const DispensarySchema = Schema({


    subscriptor:
    {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    gramsRecipe: {
        type: Number,

        required: true,
        default: 0
    },


    club: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    dateDelivery: {
        type: String,
        require: false,

    },


    isActive:
    {
        type: Boolean,
        required: false,
        default: true
    },

    isDelivery:
    {
        type: Boolean,
        required: false,
        default: false
    },

    isCancel:
    {
        type: Boolean,
        required: false,
        default: false
    },

    isUpdate:
    {
        type: Boolean,
        required: false,
        default: false
    },

    isUserNotifi:
    {
        type: Boolean,
        required: false,
        default: false
    },

    isClubNotifi:
    {
        type: Boolean,
        required: false,
        default: false
    }

},

    {
        timestamps: true
    });

DispensarySchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Dispensary', DispensarySchema);