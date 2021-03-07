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

                    totalPlants: countPlants
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


const editProduct = async (req, res = response) => {
    const { name,
        description,


        coverImage,

        cbd,
        thc,
        id } = req.body;





    try {

        const updateProduct = {
            name: name,
            description: description,

            coverImage: coverImage,
      
            cbd: cbd,
            thc: thc
        };

        console.log('after updateProduct: ', updateProduct);


        const update = await Product.updateOne(
            {
                _id: id
            },
            {
                $set: updateProduct
            }
        );

        const product = await Product.findOne({ _id: id });

        console.log(product);


        res.json({
            ok: true,
            product
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



const getPlantsByUser = async (req, res = response) => {

    try {
        const userId = req.params.id;

        console.log('userId:', userId);

        const plants = await Plant
            .find({ user: userId })
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


        const plantId = req.params.id


        const plant = await Plant.findByIdAndDelete(plantId)


        const plants = await Plant
            .find({ room: plant.room })

        const countPlants = plants.length;



        console.log(' countPlants: ', countPlants);
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
    editProduct,
    getPlantById,
    getPlantsByRoom,
    getPlantsByUser,
    deletePlant
}

