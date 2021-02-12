const { response } = require('express');
const Subscription = require('../models/subscription');



const createSubscription = async (req, res = response) => {
    const { subscriptor,
        id,
        imageRecipe,
        club,
        isUpload,
        } = req.body;

        console.log('req.body', req.body)




    try {


        const update = { 
            imageRecipe: imageRecipe,
            isUpload: true,
         };
         console.log('after create: ', update);


   await Subscription.updateOne(
        {
            _id: id
        },
        {
            $set: update
        }
    );


        const subscription = await Subscription
        .findOne({ _id: id })

        res.json({
            ok: true,
            subscription,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const getSubscribeByClubIdAndSubId = async (req, res = response) => {

    console.log('req.params##: ', req.params)

    try {
        const clubId = req.params.club;

        const subId = req.params.id;

      //  console.log('clubId:', clubId);

        console.log('subId:', subId);


        const subscription = await Subscription
            .findOne({ subscriptor: subId })
           

        console.log('subscription by user: ', subscription)


        if(!subscription){

            const newSubscription = new Subscription({ 
                subscriptor: subId,
                imageRecipe: "",
                club: clubId,
                isUpload: false,
             });
             console.log('after create: ', newSubscription);
    
           const subscription = await newSubscription.save();


        res.json({
            ok: true,
            subscription,
        })
        }

        else {

            res.json({
                ok: true,
                subscription,
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


module.exports = {
    createSubscription,
    getSubscribeByClubIdAndSubId

}

