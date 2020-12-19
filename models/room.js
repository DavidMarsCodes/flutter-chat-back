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

    totalItems: 
    {
        type: Number,
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