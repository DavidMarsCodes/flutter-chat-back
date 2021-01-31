const { response } = require('express');
const Plant = require('../models/plant');
const Room = require('../models/room');



const createPlant = async (req, res = response) => {
    const { 
        name,
        description,
        quantity,
        sexo,
        room,
        coverImage,
        germinated,
        flowering,
        pot,
        cbd,
        thc,
        user
    } = req.body;

        console.log('req.body', req.body)

        const uid = user;
        const roomid = room;

        console.log('uid', uid)
        console.log('roomid', roomid)


    try {

        const nameExist = await Plant.findOne({ name: name, user: uid, room: roomid });

        console.log('nameExist:', nameExist)
        if (nameExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes un planta con ese nombre'
            });
        }

        //const plantsTotal = await Plant.find({ user: user, room: roomid });


        const newPlant = new Plant({ 
            name,
            description,
            quantity,
            coverImage,
            sexo,
            user,
            room,
            germinated,
            flowering,
            pot,
            cbd,
            thc,
            user
         });
         console.log('after create: ', newPlant);

        const plant = await newPlant.save();

        const plants = await Plant
        .find({ room: room })

        const countPlants = plants.length;
        
       

        console.log(' countPlants: ', countPlants);
        await Room.updateOne(
            {
                _id: room
            },
            {
                $set: {

                    totalItems: countPlants
                }
            }
        );


        console.log('Plant create: ', plant);


        res.json({
            ok: true,
            plant,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const editPlant= async (req, res = response) => {
    const { name,
        description,
        quantity,
        sexo,

        germinated,
        flowering,
        pot,
        cbd,
        thc,
        id} = req.body;

    console.log('req.body', req.body)

   


    try {

        const updatePlant = { 
            name: name,
            description: description,
            quantity: quantity,
            sexo: sexo,
            germinated: germinated,
            flowering: flowering,
            pot: pot,
            cbd: cbd,
            thc: thc
         };

         console.log('after updatePlant: ', updatePlant);


       const  oupdatePlant = await Plant.updateOne(
            {
                _id: id
            },
            {
                $set: updatePlant
            }
        );

            const plant = await Plant.findOne({ _id: id});

            console.log(plant);
         

        res.json({
            ok: true,
            plant
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getPlantById = async (req, res = response) => {

    try {
        const plantId = req.params.id;

        console.log('es:', plantId);

        const plant = await Plant
            .findOne({ _id: plantId })
           


        console.log('plant** ', plant)


        res.json({
            ok: true,
            plant,
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

const getPlantsByRoom = async (req, res = response) => {

    try {
        const roomId = req.params.id;

        console.log('roomId:', roomId);

        const plants = await Plant
            .find({ room: roomId })
            .sort('-createdAt')



        console.log('plants** ', plants)


        res.json({
            ok: true,
            plants,
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

const deletePlant = async (req, res = response) => {


    try {

        console.log(req.params);

        const plantId = req.params.id

        console.log(plantId);

        const plant = await Plant.findByIdAndDelete(plantId)

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
    createPlant,
    editPlant,
    getPlantById,
    getPlantsByRoom,
    deletePlant
}

