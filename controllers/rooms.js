const { response } = require('express');
const Room = require('../models/room');
const user = require('../models/user');



const createRoom = async (req, res = response ) => {
    const { description, name } = req.body;
  
    console.log('req! ', req)
    try {

        const nameExist = await Rooms.findOne({ id: req.uid, name: name });

        console.log('nameExist:', nameExist)
        if( nameExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes un room con ese nombre'
            });
        }

    const room = new Room( {name: name, description: description });

        // Encriptar contraseña
      //  const salt = bcrypt.genSaltSync();
       // user.password = bcrypt.hashSync( password, salt );

        await room.save();
        console.log('room create: ', room)
        //const token = await generateJWT( user.id );


       // const profileNew = new Profile( {user: user.id, name: name})


    

        res.json({
            ok: true,
            room,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getRoomsByUser = async ( req, res = response ) => {


    const userId = req.uid;

    console.log(userId);

    const rooms = await Room
        .find({ user: userId })
        .sort('-createAt')



    console.log('rooms ', rooms)

    
    res.json({
        ok: true,
        rooms,
    })
}




module.exports = {
    createRoom,
    getRoomsByUser

}

