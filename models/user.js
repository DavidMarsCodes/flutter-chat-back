const { Schema, model } = require('mongoose');

const UsersSchema = Schema({

    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    online: {
        type: Boolean,
        default: false
    },

    isAuthGoogle: {
        type: Boolean,
        default: false
    },

    isAuthApple: {
        type: Boolean,
        default: false
    },

    isAuthNormal: {
        type: Boolean,
        default: false
    },

});

UsersSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model('User', UsersSchema );