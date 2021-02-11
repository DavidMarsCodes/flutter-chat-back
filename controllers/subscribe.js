const { response } = require('express');
const Subscription = require('../models/subscription');



const createSubscription = async (req, res = response) => {
    const { subscriptor,
        imageRecipe,
        club,
        isUpload,
        } = req.body;

        console.log('req.body', req.body)

        const subscId = subscriptor;
        const clubId = club



    try {

        const subscriptionExit = await Subscription.findOne({ subscriptor: subscId, club: clubId });

        console.log('subscriptionExit:', subscriptionExit)
        if (subscriptionExit) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya tienes un aire con ese nombre'
            });
        }

        const newSubscription = new Subscription({ 
            subscriptor: subscriptor,
            imageRecipe: imageRecipe,
            club: club,
            isUpload: isUpload,
         });
         console.log('after create: ', newSubscription);

       const subscription = await newSubscription.save();



        console.log('subscription create: ', subscription);

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

