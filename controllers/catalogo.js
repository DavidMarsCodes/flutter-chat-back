const { response } = require('express');
const Catalogo = require('../models/catalogo');
const Product = require('../models/product');


const Profile = require('../models/profile');

const Subscription = require('../models/subscription');







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




            res.json({
                ok: true,
                catalogos,
            })


        }

        else {

            const subscription = await Subscription
                .findOne({ subscriptor: userIAuthId, club: userId })

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




            res.json({
                ok: true,
                catalogos,
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
                catalogos: catalogos
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
    editCatalogo,
    getCatalogoById,
    getCatalogosByUsers,
    getMyCatalogos,
    deleteCatalogo,
    editPositionByCatalogo

}

