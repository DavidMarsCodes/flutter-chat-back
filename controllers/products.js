const { response } = require('express');
const Plant = require('../models/plant');
const Room = require('../models/room');

const Catalogo = require('../models/catalogo');

const Product = require('../models/product');

const Profile = require('../models/profile');

const User = require('../models/user');


const Subscription = require('../models/subscription');

const Favorite = require('../models/favorite');
const PlantProduct = require('../models/plants_product');


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
        plants
    } = req.body;


    console.log('req.body**', req.body)


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



        const reorderPlants = []

        plants.map((item, index) => {
            item.position = index;
            reorderPlants.push(item);

        });

        console.log('reorderPlants', reorderPlants)

        const plantProduct = new PlantProduct();

        const promises = reorderPlants.map((obj) =>


            new Promise((resolve, reject) => {

                const newPlantsProduct = new PlantProduct({
                    product: product,
                    user: user,
                    plant: obj.id,
                    position: obj.position

                });


                PlantProduct.create(newPlantsProduct,
                    (err, data) => {
                        if (err) console.log(err);
                        else
                            resolve();
                    });
            }));

        Promise.all(promises)
            .then(() => {

                console.log('new plantProducts', plantProduct)


                PlantProduct.find({ product: product, user: user })
                    .then((plantsProducts) => {



                        console.log('plantsProducts', plantsProducts)


                        return res.json({
                            ok: true,
                            product,

                        });

                    })



            })




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


        const productsCatalogo = await Product
            .find({ catalogo: catalogoId })
            .sort('-createdAt')

        const products = []

        const promises = productsCatalogo.map((product) =>

            new Promise((resolve, reject) => {



                Favorite.findOne({
                    product: product._id, user: product.user
                })
                    .then((favorite) => {
                        console.log('favorite', favorite)

                        const isLike = (favorite) ? favorite.isLike : false;

                        Favorite.find({
                            product: product._id, isLike: true
                        })
                            .then((favorites) => {

                                console.log('favorites', favorites)

                                const countLikes = (favorites) ? favorites.length : 0;





                                const productObj = {

                                    id: product._id,
                                    user: product.user,
                                    name: product.name,
                                    description: product.description,
                                    dateCreate: product.createdAt,
                                    dateUpdate: product.updateAt,
                                    totalProducts: product.totalProducts,
                                    coverImage: product.coverImage,
                                    catalogo: product.catalogo,
                                    ratingInit: product.ratingInit,
                                    cbd: product.cbd,
                                    thc: product.thc,
                                    isLike: isLike,
                                    countLikes: countLikes

                                };

                                products.push(productObj);
                                resolve()



                            })

                    })



            }))

        Promise.all(promises)
            .then((resolve) => {




                const productsProfilesDate = products.sort((a, b) => {

                    return new Date(b.dateCreate) - new Date(a.dateCreate);
                });




                res.json({
                    ok: true,
                    products: productsProfilesDate,
                })
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

                            console.log('catalogo', catalogo);

                            if (catalogo) {







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


                                                                Favorite.findOne({
                                                                    product: obj._id, user: uid
                                                                })
                                                                    .then((favorite) => {
                                                                        console.log('favorite', favorite)

                                                                        const isLike = (favorite) ? favorite.isLike : false;

                                                                        Favorite.find({
                                                                            product: obj._id, isLike: true
                                                                        })
                                                                            .then((favorites) => {

                                                                                console.log('favorites', favorites)

                                                                                const countLikes = (favorites) ? favorites.length : 0;

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
                                                                                        isLike: isLike,
                                                                                        countLikes: countLikes

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
                                                                                if (catalogo.privacity == '1') {

                                                                                    productsProfiles.push(productProfile);
                                                                                    resolve();

                                                                                }

                                                                                else if (catalogo.privacity == '2') {

                                                                                    const isSub = subscribeApproved && subscribeActive;
                                                                                    console.log('isSub', isSub)

                                                                                    if (isSub) {

                                                                                        productsProfiles.push(productProfile);
                                                                                        resolve();

                                                                                    }

                                                                                    else {

                                                                                        resolve();
                                                                                    }

                                                                                }
                                                                            })

                                                                    });



                                                            });

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



                        });





                }))
            Promise.all(promises)
                .then((resolve) => {



                    const productsProfilesPosition = productsProfiles.sort((a, b) => {

                        return new Date(b.product.dateCreate) - new Date(a.product.dateCreate);
                    });



                    console.log('productsProfilesPosition', productsProfilesPosition)



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


                                                                    Favorite.findOne({
                                                                        product: obj._id, user: uid
                                                                    })
                                                                        .then((favorite) => {
                                                                            console.log('favorite', favorite)

                                                                            const isLike = (favorite) ? favorite.isLike : false;

                                                                            Favorite.find({
                                                                                product: obj._id, isLike: true
                                                                            })
                                                                                .then((favorites) => {

                                                                                    console.log('favorites', favorites)

                                                                                    const countLikes = (favorites) ? favorites.length : 0;

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
                                                                                            isLike: isLike,
                                                                                            countLikes: countLikes

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
                                                                });

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


                    const productsProfilesPosition = productsProfiles.sort((a, b) => {

                        return new Date(b.product.dateCreate) - new Date(a.product.dateCreate);
                    });



                    console.log('productsProfilesPosition', productsProfilesPosition)


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
const deleteProduct = async (req, res = response) => {


    try {


        const productId = req.params.id


        const product = await Product.findByIdAndDelete(productId)


        const products = await Product
            .find({ catalogo: product.catalogo })

        const countProducts = products.length;



        await Catalogo.updateOne(
            {
                _id: product.catalogo
            },
            {
                $set: {

                    totalProducts: countProducts
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
    getLastProducts,
    deleteProduct

}

