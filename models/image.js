const { Schema, model } = require('mongoose');

const ImageSchema = Schema({

    url: {
        type: String,
        required: true
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
    plant: {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
        required: true
    }
    
},

{
    timestamps: true
});

ImageSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Image', ImageSchema );