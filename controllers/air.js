const { response } = require('express');
const Air = require('../models/air');
const Room = require('../models/room');



const createAir = async (req, res = response) => {
    const { name,
        description,
        watts,
        user,
        room} = req.body;

console.log('req.body', req.body)

        const uid = user;
        const roomid = room

        console.log('uid', uid)


    try {

        const nameExist = await Air.findOne({ name: name, user: uid, room: roomid });

        console.log('nameExist:', nameExist)
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
         console.log('after create: ', newAir);

       const air = await newAir.save();

       const countAirs = airsTotal.length;
        
       

       console.log(' countAirs: ', countAirs);
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


        console.log('newAir create: ', air);

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

    console.log('req.body', req.body)

    try {

        const updateAir = { 
            name: name, 
            description: description, 
            watts: watts
         };

         console.log('after update Air: ', updateAir);


       const  oupdateAir = await Air.updateOne(
        {
            _id: id
        },
        {
            $set: updateAir
        }
    );

            const air = await Air.findOne({ _id: id});

            console.log(air);
         

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

        console.log('es:', roomId);

        const airs = await Air
            .find({ room: roomId })
            .sort('-createdAt')

        console.log('airs by user: ', airs)


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

        console.log(req.params);

        const airId = req.params.id

        console.log(airId);

        const air = await Air.findByIdAndDelete(airId)

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

