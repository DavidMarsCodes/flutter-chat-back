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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    

},

{
    timestamps: true
});

RoomSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.roid = _id;
    return object;
})


module.exports = model('Room', RoomSchema );