const { response } = require('express');
const Subscription = require('../models/subscription');
const Profile = require('../models/profile');
const Dispensary = require('../models/dispensary');


const UpdateImageSubscription = async (req, res = response) => {
    const { subscriptor,
        id,
        imageRecipe,


    } = req.body;



    try {



        const suscriptor = await Profile
            .findOne({ user: subscriptor })


        const update = {
            imageRecipe: suscriptor.imageRecipe,
            isUpload: true,
            subscribeActive: true,
            isClubNotifi: true
        };


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

const UnSubscription = async (req, res = response) => {
    const {
        id,

    } = req.body;




    try {


        const update = {
            subscribeActive: false,
            subscribeApproved: false

        };


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


    try {
        const userAuth = req.params.userauth;

        const userId = req.params.userid;


        const profileAuth = await Profile.findOne({ user: userAuth });

        isClub = profileAuth.isClub;


        if (isClub) {


            const subscription = await Subscription
                .findOne({ subscriptor: userId, club: userAuth })



            const profile = await Profile
                .findOne({ user: userId })

            const imageRecipe = (profile.imageRecipe == "") ? "" : profile.imageRecipe;

            const isUploadImageRecipe = (profile.imageRecipe == "") ? false : true;




            if (!subscription) {

                const newSubscription = new Subscription({
                    subscriptor: userId,
                    imageRecipe: imageRecipe,
                    club: userAuth,
                    subscribeActive: false,
                    isUpload: isUploadImageRecipe,
                });

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

        else if (!isClub) {


            const subscription = await Subscription
                .findOne({ subscriptor: userAuth, club: userId })



            const profile = await Profile
                .findOne({ user: userAuth })

            const imageRecipe = (profile.imageRecipe == "") ? "" : profile.imageRecipe;

            const isUploadImageRecipe = (profile.imageRecipe == "") ? false : true;




            if (!subscription) {

                const newSubscription = new Subscription({
                    subscriptor: userAuth,
                    imageRecipe: imageRecipe,
                    club: userId,
                    subscribeActive: false,
                    isUpload: isUploadImageRecipe,
                });

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





    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const disapproveSubscription = async (req, res = response) => {
    const {
        id,

    } = req.body;



    try {


        const update = {
            subscribeActive: false,
            subscribeApproved: false

        };


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

const approveSubscription = async (req, res = response) => {
    const {
        id,

    } = req.body;





    try {


        const update = {
            subscribeApproved: true,
            isUserNotifi: true

        };


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




const getSubscriptionsUsersDispensaries = async (req, res = response) => {

    try {
        const clubId = req.params.clubId;


        const subscriptions = await Subscription
            .find({ club: clubId, subscribeApproved: true })

            .sort('-createdAt')

        const subscriptionsDispensaries = []



        //const dispensaries = await Dispensary.find({ subscriptor: subId, club: uid });






        if (subscriptions.length > 0) {


            const promises = subscriptions.map((subscription) =>





                new Promise((resolve, reject) => {


                    console.log('ello!');

                    Profile
                        .findOne({ user: subscription.subscriptor })
                        .populate('user')
                        .then((profileFind) => {

                            Dispensary.find({ subscriptor: subscription.subscriptor })
                                .then((dispensaries) => {


                                    const subscriptionItem = {

                                        id: subscription._id,
                                        subscriptor: subscription.subscriptor,
                                        imageRecipe: subscription.imageRecipe,
                                        createdAt: subscription.createdAt,
                                        updatedAt: subscription.updatedAt,
                                        subscriptor: {

                                            name: profileFind.name,
                                            lastName: profileFind.lastName,
                                            about: profileFind.about,
                                            imageHeader: profileFind.imageHeader,
                                            imageAvatar: profileFind.imageAvatar,
                                            id: profileFind._id,
                                            isClub: profileFind.isClub,


                                            user: {
                                                online: profileFind.user.online,
                                                uid: profileFind.user._id,
                                                email: profileFind.user.email,
                                                username: profileFind.user.username,

                                            },
                                            messageDate: profileFind.createdAt,

                                            createdAt: profileFind.createdAt,
                                            updatedAt: profileFind.updatedAt


                                        },
                                        club: subscription.club,
                                        isUpload: subscription.isUpload,
                                        subscribeActive: subscription.subscribeActive,
                                        subscribeApproved: subscription.subscribeApproved,
                                        isClubNotifi: subscription.isClubNotifi,
                                        isUserNotifi: subscription.isUserNotifi,
                                        dispensaries: dispensaries


                                    }



                                    subscriptionsDispensaries.push(subscriptionItem);
                                    resolve();

                                })






                        })








                }));
            Promise.all(promises)
                .then(() => {



                    return res.json({
                        ok: false,
                        subscriptionsDispensaries


                    });

                })

        }

        else {




            return res.json({
                ok: false,
                subscriptionsDispensaries


            });


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
    UpdateImageSubscription,
    UnSubscription,
    getSubscribeByClubIdAndSubId,
    disapproveSubscription,
    approveSubscription,
    getSubscriptionsUsersDispensaries


}

