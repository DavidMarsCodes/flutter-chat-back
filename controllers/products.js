const { response } = require('express');
const Plant = require('../models/plant');
const Room = require('../models/room');

const Catalogo = require('../models/catalogo');

const Product = require('../models/product');

const Profile = require('../models/profile');

const User = require('../models/user');


const Subscription = require('../models/subscription');


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

        ratingInit,
        coverImage,

        cbd,
        thc,
        id } = req.body;





    try {

        const updateProduct = {
            name: name,
            description: description,

            coverImage: coverImage,
            ratingInit: ratingInit,
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

        const uid = req.params.uid;

        console.log('uid **');

        const myprofile = await Profile.findOne({ user: uid })


        const isClub = myprofile.isClub;

        const profiles = [];


        const products = await Product
            .find()
            .sort('-createdAt')





            if (!isClub) {
                const promises = products.map((obj) =>
    
                    new Promise((resolve, reject) => {


                

                                Catalogo
                            .findById(obj.catalogo)
                            .then(catalogo => {
                            
                
                            console.log('catalogos product:', catalogo);
                
                            if(catalogo == '1' || catalogo == '2'){
        
                       
    
                       
                        if (obj.user != uid) {
    
                            Profile.findOne({ user: obj.user }
                            )
                                .sort({ updateAt: 'asc' })
                                .then(item => {
    
    
                                    User.findById(obj.user
                                    )
    
                                        .then(user => {
    
    
                                            Subscription.findOne({
                                                club: obj.user, subscriptor: uid
                                            })
                                                .then((subscription) => {
    
    
                                                    const subscribeApproved = (subscription) ? subscription.subscribeApproved : false;
                                                    const subscribeActive = (subscription) ? subscription.subscribeActive : false;
    
                                                    console.log('subscription!!!!', subscription)
    
                                                    const profile = {
                                                        name: item.name,
                                                        lastName: item.lastName,
                                                        imageHeader: item.imageHeader,
                                                        imageAvatar: item.imageAvatar,
                                                        imageRecipe: item.imageRecipe,
                                                        about: item.about,
                                                        id: item._id,
                                                        user: {
                                                            online: user.online,
                                                            uid: user._id,
                                                            email: user.email,
                                                            username: user.username,
    
                                                        },
                                                        subscribeApproved: (isClub) ? true : subscribeApproved,
                                                        subscribeActive: (isClub) ? true : subscribeActive,
                                                        message: obj.message,
                                                        isClub: item.isClub,
                                                        messageDate: obj.createdAt,
                                                        createdAt: item.createdAt,
                                                        updatedAt: item.updatedAt
    
                                                    }
    
                                                    profiles.push(profile);
                                                    resolve();
                                                })
    
                                        });
    
                                })
                            }

                            

                            else {

                                resolve();
                            };

                        }

                        

                        else {

                            resolve();
                        };

                    });

                        

                    
                        
                    }))
                Promise.all(promises)
                    .then((resolve) => {
    
    
                        console.log('profiles!!', profiles)
                        return res.json({
                            ok: true,
                            profiles: profiles
                        })
                    })
    
            }



            else {


                const promises = products.map((obj) =>
    
    
                    new Promise((resolve, reject) => {
    
                        console.log('else club **!!! ', isClub);
    
                      
    
                            Profile.findOne({ user: obj.user }
                            )
                                .sort({ updateAt: 'asc' })
                                .then(item => {
    
                                    console.log('item', item);
    
    
                                    User.findById(item.user._id
                                    )
    
                                        .then(user => {
    
                                            console.log('user', user);
    
    
                                            Subscription.findOne({
                                                club: uid, subscriptor: obj.user
                                            })
                                                .then((subscription) => {
    
    
                                                    const subscribeApproved = (subscription) ? subscription.subscribeApproved : false;
                                                    const subscribeActive = (subscription) ? subscription.subscribeActive : false;
    
                                                    console.log('subscription', subscription)
    
                                                    const profile = {
                                                        name: item.name,
                                                        lastName: item.lastName,
                                                        imageHeader: item.imageHeader,
                                                        imageAvatar: item.imageAvatar,
                                                        imageRecipe: item.imageRecipe,
    
                                                        about: item.about,
                                                        id: item._id,
                                                        user: {
                                                            online: user.online,
                                                            uid: user._id,
                                                            email: user.email,
                                                            username: user.username,
    
                                                        },
                                                        subscribeApproved: (isClub) ? true : subscribeApproved,
                                                        subscribeActive: (isClub) ? true : subscribeActive,
                                                        message: obj.message,
                                                        isClub: item.isClub,
                                                        messageDate: obj.createdAt,
                                                        createdAt: item.createdAt,
                                                        updatedAt: item.updatedAt
    
                                                    }
    
                                                    profiles.push(profile);
                                                    resolve();
                                                })
    
    
    
                                        });
    
                                })
    
                       
    
    
    
                        ;
                    }));
                Promise.all(promises)
                    .then((resolve) => {
    
    
                        console.log('profiles!!', profiles)
                        return res.json({
                            ok: true,
                            profiles: profiles
                        })
                    })
    
            }
    

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

