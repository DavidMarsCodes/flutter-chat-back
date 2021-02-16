const { response } = require('express');
const Light = require('../models/light');
const Room = require('../models/room');


const createLight = async (req, res = response) => {
    const { name,
        description,
        watts,
        kelvin,
        user,
        room} = req.body;


        const uid = user;
        const roomid = room


    try {

        const nameExist = await Light.findOne({ name: name, user: uid, room: roomid });

        if (nameExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes un aire con ese nombre'
            });
        }

        const lightTotal = await Light.find({ room: roomid  });

        const newlight = new Light({
            name: name, 
            description: description, 
            watts: watts,
            kelvin: kelvin,
            user: user, 
            room: roomid,
            position: lightTotal.length
         });


       const light = await newlight.save();

       const lightTotals = await Light.find({ room: roomid  });
       
       const countLight = lightTotals.length;
               

       await Room.updateOne(
           {
               _id: roomid
           },
           {
               $set: {

                   totalLights: countLight
               }
           }
       );

        console.log('newLight create: ', light);


        res.json({
            ok: true,
            light,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const editLight = async (req, res = response) => {
    const { name,
        description,
        watts,
        kelvin,
        id } = req.body;


    try {

        const updateLight = {
            name: name, 
            description: description, 
            watts: watts,
            kelvin: kelvin
         };


        await Light.updateOne(
            {
                _id: id
            },
            {
                $set: updateLight
            }
        );

            const light = await Light.findOne({ _id: id});

         

        res.json({
            ok: true,
            light,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getlightstByRoom = async (req, res = response) => {

    try {
        const roomId = req.params.id;


        const lights = await Light
            .find({ room: roomId })
            .sort('-createdAt')





        res.json({
            ok: true,
            lights,
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

const deleteLight = async (req, res = response) => {


    try {


        const lightId = req.params.id


        const light = await Light.findByIdAndDelete(lightId);

        const lightTotals = await Light.find({ room: light.room });

        const countLight = lightTotals.length;
             
        
        await Room.updateOne(
            {
                _id: light.room
            },
            {
                $set: {

                    totalLights: countLight
                }
            }
        );

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


module.exports = {
    createLight,
    editLight,
    getlightstByRoom,
    deleteLight
}

