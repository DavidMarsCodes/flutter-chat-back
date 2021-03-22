const { response } = require('express');
const Catalogo = require('../models/catalogo');
const Product = require('../models/product');


const Profile = require('../models/profile');

const Subscription = require('../models/subscription');


const Favorite = require('../models/favorite');





const createCatalogo = async (req, res = response) => {
    const { name,
        description,
        privacity,
        user } = req.body;


    const uid = user;



    try {

        const nameExist = await Catalogo.findOne({ name: name, user: uid });

        if (nameExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes un catalogo con ese nombre'
            });
        }

        const catalogosTotal = await Catalogo.find({ user: user });


        const newCtalogo = new Catalogo({
            name: name,
            description: description,
            privacity: privacity,
            user: user,
            position: catalogosTotal.length
        });

        const catalogo = await newCtalogo.save();



        res.json({
            ok: true,
            catalogo,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const editCatalogo = async (req, res = response) => {
    const { name,
        description,
        privacity,
        id } = req.body;





    try {

        const updateCatalogo = {
            name: name,
            description: description,
            privacity: privacity


        };



        const update = await Catalogo.updateOne(
            {
                _id: id
            },
            {
                $set: updateCatalogo
            }
        );

        const catalogo = await Catalogo.findOne({ _id: id });



        res.json({
            ok: true,
            catalogo,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getCatalogoById = async (req, res = response) => {

    try {
        const catalogoId = req.params.id;


        const catalogo = await Catalogo
            .findOne({ _id: catalogoId })




        res.json({
            ok: true,
            catalogo,
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


const getCatalogosByUsers = async (req, res = response) => {

    try {
        const userId = req.params.id;

        const userIAuthId = req.params.authid;


        const profileAuth = await Profile.findOne({ user: userIAuthId });

        const isClub = profileAuth.isClub;

        const catalogosProducts = [];


        if (isClub) {


            const subscription = await Subscription
                .findOne({ subscriptor: userId, club: userIAuthId })

            const isSubscribe = (subscription) ? subscription.subscribeActive && subscription.subscribeApproved : false;

            const catalogos = [];

            const catalogos1y2 = await Catalogo
                .find({ user: userId, privacity: { $in: ['1', '2'] } })
                .sort('position')




            catalogos1y2.map((item, index) => {

                if (item.privacity == 2) {

                    if (isSubscribe) {

                    }
                }

                else {




                    catalogos.push(item);
                }


            });

            console.log('catalogos user:');


            const promises = catalogos.map((item) =>

                new Promise((resolve, reject) => {





                    Product
                        .find({ catalogo: item._id })

                        .then(products => {






                            const catalogo = {
                                id: item._id,
                                name: item.name,
                                description: item.description,
                                user: item.user,
                                position: item.position,
                                privacity: item.privacity,
                                totalProducts: item.totalProducts,
                                products: products

                            };





                            console.log('catalogoProducts fimal!!', catalogo)



                            catalogosProducts.push(catalogo);

                            resolve();



                        })






                }))


            Promise.all(promises)
                .then((resolve) => {




                    console.log(resolve)



                    const catalogosProductsPosition = catalogosProducts.sort((a, b) => (a.position > b.position) ? 1 : -1)


                    console.log('catalogosProducts final', catalogosProductsPosition)

                    return res.json({
                        ok: true,

                        catalogosProducts: catalogosProductsPosition
                    })




                })





        }

        else {

            const subscription = await Subscription
                .findOne({ subscriptor: userIAuthId, club: userId })

            const isSubscribe = (subscription) ? subscription.subscribeActive && subscription.subscribeApproved : false;





            const catalogos = [];

            const catalogosProducts = [];

            const catalogos1y2 = await Catalogo
                .find({ user: userId, privacity: { $in: ['1', '2'] } })
                .sort('position')




            catalogos1y2.map((item, index) => {

                if (item.privacity == 2) {

                    if (isSubscribe) {

                        catalogos.push(item);
                    }
                }

                else {




                    catalogos.push(item);
                }


            });

            console.log('catalogos', catalogos)


            const promises = catalogos.map((item) =>

                new Promise((resolve, reject) => {





                    Product
                        .find({ catalogo: item._id })

                        .then(products => {






                            const catalogo = {
                                id: item._id,
                                name: item.name,
                                description: item.description,
                                user: item.user,
                                position: item.position,
                                privacity: item.privacity,
                                totalProducts: item.totalProducts,
                                products: []

                            };





                            console.log('catalogoProducts fimal!!', catalogo)



                            catalogosProducts.push(catalogo);

                            resolve();



                        })






                }))


            Promise.all(promises)
                .then((resolve) => {



                    const array = [];

                    console.log(resolve)






                    const promisesFavorite = catalogosProducts.map((obj) =>

                        new Promise((resolve, reject) => {


                            console.log('obj!!!', obj)

                            Product
                                .find({ catalogo: obj.id })

                                .then(products => {



                                    products.map((product) => {



                                        Favorite.findOne({
                                            product: product._id, user: userIAuthId
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




                                                        const productLike = {

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

                                                        var catalogoId = String(product.catalogo);

                                                        const find = catalogosProducts.find(function (item) {
                                                            return String(item.id) == catalogoId
                                                        });



                                                        console.log(find);

                                                        find.products.push(productLike)
                                                        //catalogosProducts[index].products.push(productLike)


                                                        resolve();

                                                    });





                                            });

                                    })










                                });


                        }));





                    Promise.all(promisesFavorite)
                        .then((resolve) => {




                            const catalogosProductsPosition = catalogosProducts.sort((a, b) => (a.position > b.position) ? 1 : -1)
                            console.log('catalogosProductsPosition', catalogosProductsPosition);

                            return res.json({
                                ok: true,

                                catalogosProducts: catalogosProductsPosition
                            })



                        });













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

const getMyCatalogos = async (req, res = response) => {

    try {
        const userId = req.params.id;



        const myprofile = await Profile.findOne({ user: userId })


        const isClub = myprofile.isClub;



        const catalogos = await Catalogo
            .find({ user: userId })
            .sort('position')



        console.log('catalogos', catalogos)

        const products = await Product
            .find({ user: userId })
            .sort('position')



        console.log('products', products)








        return res.json({
            ok: true,
            catalogos: catalogos,
            products: products
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

const getMyCatalogosProducts = async (req, res = response) => {

    try {
        const userId = req.params.id;



        const myprofile = await Profile.findOne({ user: userId })


        const isClub = myprofile.isClub;

        catalogosProducts = [];








        const catalogos = await Catalogo
            .find({ user: userId })
            .sort('position')






        const promises = catalogos.map((item) =>

            new Promise((resolve, reject) => {








                const catalogo = {
                    id: item._id,
                    name: item.name,
                    description: item.description,
                    user: item.user,
                    position: item.position,
                    privacity: item.privacity,
                    totalProducts: item.totalProducts,
                    products: []

                };





                console.log('catalogoProducts fimal!!', catalogo)



                catalogosProducts.push(catalogo);

                resolve();








            }))


        Promise.all(promises)
            .then((resolve) => {



                const array = [];

                console.log(resolve)






                const promisesFavorite = catalogosProducts.map((obj) =>

                    new Promise((resolve, reject) => {


                        console.log('obj!!!', obj)

                        Product
                            .find({ catalogo: obj.id })

                            .then((products) => {

                                console.log('products ***', products)

                                if (products.length > 0) {

                                    products.map((product) => {



                                        Favorite.findOne({
                                            product: product._id, user: userId
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




                                                        const productLike = {

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

                                                        var catalogoId = String(product.catalogo);

                                                        const find = catalogosProducts.find(function (item) {
                                                            return String(item.id) == catalogoId
                                                        });



                                                        console.log(find);

                                                        find.products.push(productLike)
                                                        //catalogosProducts[index].products.push(productLike)

                                                        resolve();


                                                    });





                                            });



                                    })



                                }

                                else {

                                    resolve();
                                }










                            });


                    }));




                Promise.all(promisesFavorite)
                    .then((resolve) => {




                        const catalogosProductsPosition = catalogosProducts.sort((a, b) => (a.position > b.position) ? 1 : -1)
                        console.log('catalogosProductsPosition', catalogosProductsPosition);

                        return res.json({
                            ok: true,

                            catalogosProducts: catalogosProductsPosition
                        })



                    });













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

const deleteRoom = async (req, res = response) => {


    try {


        const roomId = req.params.id


        const room = await Room.findByIdAndDelete(roomId)

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





const editPositionByCatalogo = async (req, res = response) => {
    try {

        const onReorderCatalogos = []

        req.body.catalogos.map((item, index) => {
            item.position = index;
            onReorderCatalogos.push(item);

        });

        const promises = onReorderCatalogos.map((obj) =>

            new Promise((resolve, reject) => {
                Catalogo.updateOne({ _id: obj.id }, { $set: { position: obj.position } },
                    (err, data) => {
                        if (err) console.log(err);
                        else
                            resolve();
                    });
            }));
        Promise.all(promises)
            .then(() => {
                return res.json({
                    ok: true,
                    msg: 'posicion editada con exito!'
                })
            })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const deleteCatalogo = async (req, res = response) => {


    try {


        const catalogoId = req.params.id


        const catalogo = await Catalogo.findByIdAndDelete(catalogoId)

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
    createCatalogo,
    getMyCatalogosProducts,
    editCatalogo,
    getCatalogoById,
    getCatalogosByUsers,
    getMyCatalogos,
    deleteCatalogo,
    editPositionByCatalogo

}

