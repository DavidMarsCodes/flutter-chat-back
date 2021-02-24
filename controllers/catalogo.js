const { response } = require('express');
const Catalogo = require('../models/catalogo');

const Profile = require('../models/profile');

const Subscription = require('../models/subscription');







const createCatalogo = async (req, res = response) => {
    const { name,
        description,
        privacity,
        user} = req.body;

console.log('req.body', req.body)

        const uid = user;

        console.log('uid', uid)


    try {

        const nameExist = await Catalogo.findOne({ name: name, user: uid });

        console.log('nameExist:', nameExist)
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
         console.log('after create: ', newCtalogo);

       const catalogo = await newCtalogo.save();

        console.log('catalogo create: ', catalogo);


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


const editRoom = async (req, res = response) => {
    const { name,
        description,
        wide,
        long,
        tall,
        co2,
        co2Control,
        timeOn,
        timeOff ,
        id} = req.body;

    console.log('req.body', req.body)

   


    try {

        const updateRoom = { 
            name: name, 
            description: description, 
            wide: wide,
            long: long,
            tall: tall,
            co2: co2,
            co2Control: co2Control,
            timeOn: timeOn,
            timeOff: timeOff,
           
           
         };

         console.log('after newRoom: ', updateRoom);


       const  uodateRoom = await Room.updateOne(
        {
            _id: id
        },
        {
            $set: updateRoom
        }
    );

            const room = await Room.findOne({ _id: id});

            console.log(room);
         

        res.json({
            ok: true,
            room,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getRoomById = async (req, res = response) => {

    try {
        const roomId = req.params.id;

        console.log('es:', roomId);

        const room = await Room
            .findOne({ _id: roomId })
           


        console.log('room** ', room)


        res.json({
            ok: true,
            room,
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

        console.log( 'ids params: ', userId,userIAuthId ); 


        const profileAuth = await Profile.findOne({user: userIAuthId});

        const isClub = profileAuth.isClub;

        console.log(isClub)

        if(isClub){


            const subscription = await Subscription
            .findOne({ subscriptor: userId, club: userIAuthId  })
    
            const isSubscribe =  (subscription)? subscription.subscribeActive && subscription.subscribeApproved: false;
    
            console.log('subscription', subscription);
    
            console.log('!!isSubscribe!!', isSubscribe);



        const catalogos = [];

        const catalogos1y2 = await Catalogo
            .find({ user: userId , privacity: {$in: ['1', '2']}  })
            .sort('position')



        
            catalogos1y2.map((item, index) => { 
                
                if(item.privacity == 2){

                    if(isSubscribe){

                        console.log('is 2 and subscribe item:', item)

                        catalogos.push(item);
                    }
                }

                else {

                    console.log('is 1 item:', item)


                    catalogos.push(item);
                }
               
    
            });
        console.log('catalogos** ', catalogos)




        res.json({
            ok: true,
            catalogos,
        })


        }

        else {

            const subscription = await Subscription
            .findOne({ subscriptor:userIAuthId , club:  userId  })
    
            const isSubscribe = subscription.subscribeActive && subscription.subscribeApproved;
    
            console.log('subscription', subscription);
    
            console.log('!!isSubscribe!!', isSubscribe);



        const catalogos = [];

        const catalogos1y2 = await Catalogo
            .find({ user: userId , privacity: {$in: ['1', '2']}  })
            .sort('position')



        
            catalogos1y2.map((item, index) => { 
                
                if(item.privacity == 2){

                    if(isSubscribe){

                        console.log('is 2 and subscribe item:', item)

                        catalogos.push(item);
                    }
                }

                else {

                    console.log('is 1 item:', item)


                    catalogos.push(item);
                }
               
    
            });
        console.log('catalogos** ', catalogos)




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


        console.log('es:', userId);

        const catalogos = await Catalogo
            .find({ user: userId })
            .sort('position')



        console.log('catalogos** ', catalogos)


        res.json({
            ok: true,
            catalogos,
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

        console.log(req.params);

        const roomId = req.params.id

        console.log(roomId);

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

        console.log(req.params);

        const catalogoId = req.params.id

        console.log(catalogoId);

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
    editRoom,
    getRoomById,
    getCatalogosByUsers,
    getMyCatalogos,
    deleteCatalogo,
    editPositionByCatalogo

}