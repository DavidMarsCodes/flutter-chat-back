const User = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const userConnect = async ( uid = '' ) => {

    try {

        const usuario  = await User.findById( uid );
        usuario.online = true;
        await usuario.save();
        return usuario;
        
    } catch (error) {
        return false
    }

}

const userDisconnect = async ( uid = '' ) => {

    try {

        const usuario  = await User.findById( uid );
        usuario.online = false;
        await usuario.save();
        return usuario;
        
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
        const mensaje = new Mensaje( payload );
        await mensaje.save();

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


