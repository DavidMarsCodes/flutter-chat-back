const { response } = require('express');
const Room = require('../models/room');
const user = require('../models/user');



const createRoom = async (req, res = response ) => {
    const { description, name, id } = req.body;
  
    console.log('id! ', id)
    try {

        const nameExist = await Room.findOne({name: name, user:id });

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

    try {
    const userId = req.params.id;

    console.log('es:',userId);

    const rooms = await Room
        .find({ user: userId })
        .sort('-createAt')



    console.log('rooms ', rooms)

    
    res.json({
        ok: true,
        rooms,
    })

}

catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    });
}

}

const deleteRoom = async (req, res = response ) => {


    try{

        console.log(req.params);

    const roomId = req.params.id

    console.log(roomId);

    const room = await Room.findByIdAndDelete(roomId)

    res.json({
        ok: true,
        msg: 'Eliminado con exito!'
    })

}


catch (error) {
    console.log(error);
    res.status(500).json({
        ok: false,
        msg: 'Hable con el administrador'
    });
}

}

const editPositionByRoom = async (req, res = response ) => {
    try {

            console.log(req.body)
        const roomId = req.body.id;

      const room =  await Room.updateOne(
            {
              user: roomId
            },
            {
              $set: {
                position: req.body.position,
                
              }
            }
          )

          res.json({
            ok: true,
            msg: 'Success position!',
            room

        })
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
        
    }
}




module.exports = {
    createRoom,
    getRoomsByUser,
    deleteRoom,
    editPositionByRoom

}

