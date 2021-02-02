const { response } = require('express');
const Light = require('../models/light');



const createLight = async (req, res = response) => {
    const { name,
        description,
        watts,
        kelvin,
        user,
        room} = req.body;

console.log('req.body', req.body)

        const uid = user;
        const roomid = room

        console.log('uid', uid)


    try {

        const nameExist = await Light.findOne({ name: name, user: uid, room: roomid });

        console.log('nameExist:', nameExist)
        if (nameExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes un aire con ese nombre'
            });
        }

        const lightTotal = await Light.find({ user: user });


        const newlight = new Light({ 
            name: name, 
            description: description, 
            watts: watts,
            kelvin: kelvin,
            user: user, 
            room: roomid,
            position: lightTotal.length
         });
         console.log('after create: ', newlight);

       const light = await newLight.save();

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

    console.log('req.body', req.body)

    try {

        const updateLight = {
            name: name, 
            description: description, 
            watts: watts,
            kelvin: kelvin
         };

        console.log('after update Light: ', updateLight);

        await Light.updateOne(
        {
            _id: id
        },
        {
            $set: updateLight
        }
    );

            const light = await Light.findOne({ _id: id});

            console.log(light);
         

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

        console.log('es:', roomId);

        const light = await Light
            .find({ room: roomId })
            .sort('position')



        console.log('light by user: ', light)


        res.json({
            ok: true,
            light,
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

        console.log(req.params);

        const lightId = req.params.id

        console.log(lightId);

        const light = await Light.findByIdAndDelete(lightId)

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

