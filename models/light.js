const { Schema, model } = require('mongoose');

const LightSchema = Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false,
    },
    watts: 
    {
        type: String,
        required: false,
        default: 0
    },
    kelvin: 
    {
        type: String,
        required: false,
        default: 0
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

    position: 
    {
        type: Number,
        required: false,
        default: 0
    }

},

{
    timestamps: true
});

LightSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Light', LightSchema );