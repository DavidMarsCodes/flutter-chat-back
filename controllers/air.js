const { response } = require('express');
const Air = require('../models/air');
const Room = require('../models/room');



const createAir = async (req, res = response) => {
    const { name,
        description,
        watts,
        user,
        room} = req.body;


        const uid = user;
        const roomid = room



    try {

        const nameExist = await Air.findOne({ name: name, user: uid, room: roomid });

        if (nameExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes un aire con ese nombre'
            });
        }

        const airsTotal = await Air.find({ room: roomid });



        const newAir = new Air({ 
            name: name, 
            description: description, 
            watts: watts,
            user: user, 
            room: roomid,
            position: airsTotal.length
         });

       const air = await newAir.save();

       const airsTotals = await Air.find({ room: roomid });

       const countAirs = airsTotals.length;
        
       

       await Room.updateOne(
           {
               _id: roomid
           },
           {
               $set: {

                   totalAirs: countAirs
               }
           }
       );



        res.json({
            ok: true,
            air,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const editAir = async (req, res = response) => {
    const { name,
        description,
        watts,
        id } = req.body;


    try {

        const updateAir = { 
            name: name, 
            description: description, 
            watts: watts
         };



       const  oupdateAir = await Air.updateOne(
        {
            _id: id
        },
        {
            $set: updateAir
        }
    );

            const air = await Air.findOne({ _id: id});

         

        res.json({
            ok: true,
            air,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getAirsByRoom = async (req, res = response) => {

    try {
        const roomId = req.params.id;


        const airs = await Air
            .find({ room: roomId })
            .sort('-createdAt')



        res.json({
            ok: true,
            airs,
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

const deleteAir = async (req, res = response) => {


    try {


        const airId = req.params.id


        const air = await Air.findByIdAndDelete(airId);

        const airsTotals = await Air.find({ room: air.room });

        const countAirs = airsTotals.length;
        

        await Room.updateOne(
            {
                _id: air.room
            },
            {
                $set: {

                    totalAirs: countAirs
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
    createAir,
    editAir,
    getAirsByRoom,
    deleteAir
}

