const { Schema, model } = require('mongoose');

const RoomSchema = Schema({

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

    totalPlants: 
    {
        type: Number,
        required: false,
        default: 0
    },

    totalAirs: 
    {
        type: Number,
        required: false,
        default: 0
    },

    totalLights: 
    {
        type: Number,
        required: false,
        default: 0
    },

    position: 
    {
        type: Number,
        required: false,
        default: 0
    },


    wide: 
    {
        type: String,
        required: false,
        default: 0
    },

    long: 
    {
        type: String,
        required: false,
        default: 0
    },
    tall: 
    {
        type: String,
        required: false,
        default: 0
    },

    co2: 
    {
        type: Boolean,
        required: false,
        default: 0
    },


    co2Control: 
    {
        type: Boolean,
        required: false,
        default: 0
    },

    timeOn: 
    {
        type: String,
        required: false,
        default: 0
    },

    timeOff: 
    {
        type: String,
        required: false,
        default: 0
    },




},

{
    timestamps: true
});

RoomSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Room', RoomSchema );