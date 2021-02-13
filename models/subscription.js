const { Schema, model } = require('mongoose');

const SubscriptionSchema = Schema({


    subscriptor:
    {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    imageRecipe:
    {
        type: String,
        required: false,
        default: ''
    },

    club: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: true
    },


    isUpload:
    {
        type: Boolean,
        required: false,
        default: false
    },

    subscribeActive:
    {
        type: Boolean,
        required: false,
        default: false
    },

    subscribeAccepted:
    {
        type: Boolean,
        required: false,
        default: false
    }

},

    {
        timestamps: true
    });

    SubscriptionSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Subscription', SubscriptionSchema);