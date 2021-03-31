const { response } = require('express');
const Plant = require('../models/plant');
const Room = require('../models/room');



const createPlant = async (req, res = response) => {
    const {
        name,
        description,
        quantity,

        room,
        coverImage,
        germinated,
        flowering,
        pot,
        cbd,
        thc,
        user
    } = req.body;


    const uid = user;
    const roomid = room;




    try {

        const nameExist = await Plant.findOne({ name: name, user: uid, room: roomid });

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

            user,
            room,
            germinated,
            flowering,
            pot,
            cbd,
            thc,
            user
        });

        const plant = await newPlant.save();

        const plants = await Plant
            .find({ room: room })

        const countPlants = plants.length;


        await Room.updateOne(
            {
                _id: room
            },
            {
                $set: {

                    totalPlants: countPlants
                }
            }
        );




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


const editPlant = async (req, res = response) => {
    const { name,
        description,
        quantity,

        coverImage,
        germinated,
        flowering,
        pot,
        cbd,
        thc,
        id } = req.body;





    try {

        const updatePlant = {
            name: name,
            description: description,
            quantity: quantity,

            coverImage: coverImage,
            germinated: germinated,
            flowering: flowering,
            pot: pot,
            cbd: cbd,
            thc: thc
        };


        const oupdatePlant = await Plant.updateOne(
            {
                _id: id
            },
            {
                $set: updatePlant
            }
        );

        const plant = await Plant.findOne({ _id: id });



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


        const plant = await Plant
            .findOne({ _id: plantId })





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


        const plants = await Plant
            .find({ room: roomId })
            .sort('-createdAt')





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



const getPlantsByUser = async (req, res = response) => {

    try {
        const userId = req.params.id;


        const plants = await Plant
            .find({ user: userId })
            .sort('-createdAt')





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


        const plantId = req.params.id


        const plant = await Plant.findByIdAndDelete(plantId)


        const plants = await Plant
            .find({ room: plant.room })

        const countPlants = plants.length;



        await Room.updateOne(
            {
                _id: plant.room
            },
            {
                $set: {

                    totalPlants: countPlants
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
    createPlant,
    editPlant,
    getPlantById,
    getPlantsByRoom,
    getPlantsByUser,
    deletePlant
}

