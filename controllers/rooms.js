const { response } = require('express');
const Room = require('../models/room');
const user = require('../models/user');



const createRoom = async (req, res = response ) => {
    const { description, name, id } = req.body;
  
    console.log('id! ', id)
    try {

        const nameExist = await Room.findOne({ name: name });

        console.log('nameExist:', nameExist)
        if( nameExist ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes un room con ese nombre'
            });
        }

    const room = new Room( {name: name, description: description, user: id });

  
        await room.save();
        console.log('room create: ', room)


        res.json({
            ok: true,
            room,
            
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

