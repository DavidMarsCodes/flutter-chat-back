const { response } = require('express');
const Plant = require('../models/plant');
const Room = require('../models/room');

const Catalogo = require('../models/catalogo');

const Product = require('../models/product');

const Profile = require('../models/profile');

const User = require('../models/user');


const Subscription = require('../models/subscription');
const profile = require('../models/profile');


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

        const product = await newProduct.save();

        const products = await Product
            .find({ catalogo: catalogo })

        const countProducts = products.length;



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
        id



    } = req.body;





    try {

        const updateProduct = {
            name: name,
            description: description,

            coverImage: coverImage,
            ratingInit: ratingInit,
            cbd: cbd,
            thc: thc
        };



        const update = await Product.updateOne(
            {
                _id: id
            },
            {
                $set: updateProduct
            }
        );

        const product = await Product.findById(id);

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

const getProductsByCatalogo = async (req, res = response) => {

    try {
        const catalogoId = req.params.id;


        const products = await Product
            .find({ catalogo: catalogoId })
            .sort('-createdAt')





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

const getLastProducts = async (req, res = response) => {

    try {

        const uid = req.params.uid;


        const myprofile = await Profile.findOne({ user: uid })


        const isClub = myprofile.isClub;

        const productsProfiles = [];


        const allProducts = await Product
            .find()
            .sort('-createdAt')





        if (!isClub) {
            const promises = allProducts.map((obj) =>

                new Promise((resolve, reject) => {




                    Catalogo
                        .findById(obj.catalogo)
                        .then(catalogo => {

                            if (catalogo) {

                                if (catalogo.privacity == '1' || catalogo.privacity == '2') {




                                    if (obj.user != uid) {

                                        Profile.findOne({ user: obj.user }
                                        )
                                            .sort({ updateAt: 'asc' })
                                            .then(item => {


                                                if (item) {
                                                    if (item.isClub) {

                                                        User.findById(obj.user
                                                        )

                                                            .then(user => {


                                                                Subscription.findOne({
                                                                    club: obj.user, subscriptor: uid
                                                                })
                                                                    .then((subscription) => {


                                                                        const subscribeApproved = (subscription) ? subscription.subscribeApproved : false;
                                                                        const subscribeActive = (subscription) ? subscription.subscribeActive : false;



                                                                        const productProfile = {



                                                                            product: {

                                                                                id: obj._id,
                                                                                user: obj.user,
                                                                                name: obj.name,
                                                                                description: obj.description,
                                                                                dateCreate: obj.createdAt,
                                                                                dateUpdate: obj.updateAt,
                                                                                totalProducts: obj.totalProducts,
                                                                                coverImage: obj.coverImage,
                                                                                catalogo: obj.catalogo,
                                                                                ratingInit: obj.ratingInit,
                                                                                cbd: obj.cbd,
                                                                                thc: obj.thc,

                                                                            },



                                                                            profile: {
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



                                                                        }



                                                                        productsProfiles.push(productProfile);
                                                                        resolve();
                                                                    })

                                                            });

                                                    }

                                                    else {

                                                        resolve();
                                                    };


                                                }

                                                else {

                                                    resolve();
                                                };

                                            })
                                    }



                                    else {

                                        resolve();
                                    };

                                }





                                else {

                                    resolve();
                                };

                            }

                            else {
                                resolve();

                            }

                        });





                }))
            Promise.all(promises)
                .then((resolve) => {


                    const productsProfilesPosition = productsProfiles.sort((a, b) => (parseInt(a.ratingInit) > parseInt(b.ratingInit)) ? 1 : -1)



                    return res.json({
                        ok: true,
                        productsProfiles: productsProfilesPosition
                    })
                })

        }



        else {


            const promises = allProducts.map((obj) =>

                new Promise((resolve, reject) => {




                    Catalogo
                        .findById(obj.catalogo)
                        .then(catalogo => {

                            console.log('catalogo', catalogo);

                            if (catalogo) {




                                if (catalogo.privacity == '1' || catalogo.privacity == '2') {


                                    Profile.findOne({ user: obj.user }
                                    )
                                        .sort({ updateAt: 'asc' })
                                        .then(item => {


                                            if (item) {
                                                if (item.isClub) {

                                                    User.findById(obj.user
                                                    )

                                                        .then(user => {


                                                            Subscription.findOne({
                                                                club: obj.user, subscriptor: uid
                                                            })
                                                                .then((subscription) => {


                                                                    const subscribeApproved = (subscription) ? subscription.subscribeApproved : false;
                                                                    const subscribeActive = (subscription) ? subscription.subscribeActive : false;




                                                                    const productProfile = {



                                                                        product: {

                                                                            id: obj._id,
                                                                            user: obj.user,
                                                                            name: obj.name,
                                                                            description: obj.description,
                                                                            dateCreate: obj.createdAt,
                                                                            dateUpdate: obj.updateAt,
                                                                            totalProducts: obj.totalProducts,
                                                                            coverImage: obj.coverImage,
                                                                            catalogo: obj.catalogo,
                                                                            ratingInit: obj.ratingInit,
                                                                            cbd: obj.cbd,
                                                                            thc: obj.thc,

                                                                        },



                                                                        profile: {
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



                                                                    }


                                                                    productsProfiles.push(productProfile);
                                                                    resolve();
                                                                })

                                                        });

                                                }

                                                else {

                                                    resolve();
                                                };

                                            }

                                            else {

                                                resolve();
                                            };

                                        })


                                }



                                else {

                                    resolve();
                                };

                            }

                            else {

                                resolve();
                            }

                        });





                }))
            Promise.all(promises)
                .then((resolve) => {

                    const productsProfilesPosition = productsProfiles.sort((a, b) => (parseInt(a.ratingInit) > parseInt(b.ratingInit)) ? 1 : -1)



                    return res.json({
                        ok: true,
                        productsProfiles: productsProfilesPosition
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
    createProduct,
    editProduct,
    getProductsByCatalogo,
    getLastProducts

}

