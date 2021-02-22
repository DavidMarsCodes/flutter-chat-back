const { Schema, model } = require('mongoose');

const VisitSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plant: {
        type: Schema.Types.ObjectId,
        ref: 'Plant',
        required: true
    },
    description: {
        type: String,
        required: false,
        default: ''
    },   
    coverImage: {
        type: String,
        required: false,
        default: ''
    },
    clean: {
        type: Boolean,
        required: true,
        default: false
    },
    temperature: {
        type: Boolean,
        required: true,
        default: false
    },
    degrees: {
        type: String,
        required: false,
        default: ''
    },
    cut: {
        type: Boolean,
        required: true,
        default: false
    },
    water: {
        type: Boolean,
        required: true,
        default: false
    },
    abono: {
        type: Boolean,
        required: true,
        default: false
    },
    electro: {
        type: String,
        required: false,
        default: ''
    },
    ph: {
        type: String,
        required: false,
        default: ''
    },
    ml: {
        type: String,
        required: false,
        default: ''
    }

},

{
    timestamps: true
});

VisitSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Visit', VisitSchema );