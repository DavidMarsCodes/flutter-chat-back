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

    subscribeApproved:
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
    },

    isUserNotifi:
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