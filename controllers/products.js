const { response } = require('express');
const Plant = require('../models/plant');
const Room = require('../models/room');

const Catalogo = require('../models/catalogo');

const Product = require('../models/product');




const createProduct = async (req, res = response) => {
    const { 
        name,
        description,
        catalogo,
        user
    } = req.body;





    try {

        const nameExist = await Product.findOne({ name: name, user: user, catalogo: catalogo });

        if (nameExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes un tratamiento con ese nombre'
            });
        }

        //const plantsTotal = await Plant.find({ user: user, room: roomid });


        const newProduct = new Product({ 
            name,
            description,
            catalogo,
            user
         });
         console.log('after create: ', newProduct);

        const product = await newProduct.save();

        const products = await Product
        .find({ catalogo: catalogo })

        const countProducts = products.length;
        
       

        console.log(' countProducts: ', countProducts);
        await Catalogo.updateOne(
            {
                _id: catalogo
            },
            {
                $set: {

                    totalProducts: countProducts
                }
            }
        );


        console.log('Product create: ', product);


        res.json({
            ok: true,
            product,

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
        coverImage,
        germinated,
        flowering,
        pot,
        cbd,
        thc,
        id} = req.body;


   


    try {

        const updatePlant = { 
            name: name,
            description: description,
            quantity: quantity,
            sexo: sexo,
            coverImage: coverImage,
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
    createProduct,
    editPlant,
    getPlantById,
    getPlantsByRoom,
    getPlantsByUser,
    deletePlant
}

