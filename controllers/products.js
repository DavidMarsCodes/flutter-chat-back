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
        user,
        coverImage,
        ratingInit,
        cbd,
        thc,
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
            coverImage,
            catalogo,
            ratingInit,
            user,
            cbd,
            thc,
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

const getProductsByCatalogo = async (req, res = response) => {

    try {
        const catalogoId = req.params.id;

        console.log('catalogoId:', catalogoId);

        const products = await Product
            .find({ catalogo: catalogoId })
            .sort('-createdAt')



        console.log('products** ', products)


        res.json({
            ok: true,
            products,
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

const getLastProducts= async (req, res = response) => {

    try {


        const products = await Product
            .find()
            .sort('-createdAt')



        console.log('products** ', products)


        res.json({
            ok: true,
            products,
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
    editProduct,
    getProductsByCatalogo,
    getLastProducts

}

