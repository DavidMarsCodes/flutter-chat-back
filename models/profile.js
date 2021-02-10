const { Schema, model } = require('mongoose');
const { RoomSchema } = require('./room');

const ProfileSchema = Schema({

    name: {
        type: String,
        default: ''
    
    },
    lastName: {
        type: String,
        default: '',
        
      
    },
    imageHeader: {
        type: String,
        default: '',
        
    },
    imageAvatar: {
        type: String,
        default: '',
        
    },

    about: {
        type: String,
        default: '',
        
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },


    isClub: {
        type: Boolean,
        default: false,
        
    },
  

},

{
    timestamps: true
}
);

ProfileSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})


module.exports = model('Profile', ProfileSchema );