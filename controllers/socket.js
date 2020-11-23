const User = require('../models/user');
const Message = require('../models/message');

const userConnect = async ( uid = '' ) => {

    try {

        const user  = await User.findById( uid );
        user.online = true;
        await user.save();
        return user;
        
    } catch (error) {
        return false
    }

}

const userDisconnect = async ( uid = '' ) => {

    try {

        const user  = await User.findById( uid );
        user.online = false;
        await user.save();
        return user;
        
    } catch (error) {
        return false;
    }

}

const saveMessage = async( payload ) => {

    /*
        payload: {
            de: '',
            para: '',
            texto: ''
        }
    */

    try {
        const message = new Message( payload );
        await message.save();

        return true;
    } catch (error) {
        return false;
    }

}



module.exports = {
    userConnect,
    userDisconnect,
    saveMessage
}


