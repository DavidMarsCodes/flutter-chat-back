
const Subscription = require('../models/subscription');
const Profile = require('../models/profile');
const User = require('../models/user');
const Message = require('../models/message');
const Dispensary = require('../models/dispensary');


const getProfilesSubscriptorsByUser = async (req, res) => {


    try {

        const uid = req.params.uid;

        const myprofile = await Profile.findOne({ user: uid })


        const isClub = myprofile.isClub;



        if (isClub) {


            const update = {

                isClubNotifi: false
            };


            await Subscription.updateMany(
                {
                    club: uid
                },
                {
                    $set: update
                }
            );



            const subscription = await Subscription
                .find({ club: uid, subscribeApproved: false, isUpload: true, subscribeActive: true })
                .sort({ createdAt: 'asc' })


            const profiles = [];

            const promises = subscription.map((obj) =>

                new Promise((resolve, reject) => {

                    Profile.findOne({ user: obj.subscriptor }
                    )
                        .then(item => {

                            if (item) {

                                User.findById(obj.subscriptor
                                )

                                    .then(user => {

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
                                            messageDate: obj.createdAt,

                                            subscribeActive: obj.subscribeActive,
                                            subscribeApproved: obj.subscribeApproved,
                                            subId: obj._id,
                                            isClub: item.isClub,
                                            isUpload: obj.isUpload,
                                            createdAt: item.createdAt,
                                            updatedAt: item.updatedAt

                                        }

                                        profiles.push(profile);
                                        resolve();

                                    });

                            }

                        })
                        ;
                }));

            Promise.all(promises)
                .then((resolve) => {



                    const profilesOrder = profiles.sort((a, b) => {

                        return new Date(b.messageDate) - new Date(a.messageDate);
                    });


                    return res.json({
                        ok: true,
                        profiles: profilesOrder
                    })
                })


        }

        else {

            const update = {

                isUserNotifi: false
            };


            await Subscription.updateMany(
                {
                    subscriptor: uid
                },
                {
                    $set: update
                }
            );



            console.log('else!!!')

            const subscription = await Subscription
                .find({ subscriptor: uid, subscribeApproved: true, isUpload: true, subscribeActive: true })
                .sort({ createdAt: 'asc' })



            const profiles = [];

            const promises = subscription.map((obj) =>

                new Promise((resolve, reject) => {

                    Profile.findOne({ user: obj.club }
                    )
                        .then(item => {



                            if (item.user._id != uid) {

                                User.findById(obj.club
                                )

                                    .then(user => {

                                        Dispensary.findOne({ club: obj.club, subscriptor: uid })

                                            .then((dispensary) => {

                                                const profileDispensary = {





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
                                                        messageDate: obj.createdAt,
                                                        isClub: item.isClub,
                                                        subscribeActive: obj.subscribeActive,
                                                        subscribeApproved: obj.subscribeApproved,
                                                        subId: obj._id,
                                                        isUpload: obj.isUpload,
                                                        createdAt: item.createdAt,
                                                        updatedAt: item.updatedAt

                                                    },

                                                    dispensary: (dispensary) ? dispensary : new Dispensary({
                                                        gramsRecipe: 0,
                                                        dateDelivery: "",

                                                        isActive: false,
                                                        isDelivered: false,
                                                        isCancel: false,
                                                        isUpdate: false,
                                                        isUserNotifi: false,
                                                        isClubNotifi: false,
                                                        isEdit: false,
                                                        subscriptor: user._id,
                                                        club: uid,
                                                        createdAt: item.createdAt,
                                                        updatedAt: item.createdAt,
                                                        id: "",
                                                    })

                                                }


                                                profiles.push(profileDispensary);
                                                resolve();

                                            })





                                    });

                            }

                            else {

                                resolve();
                            }

                        })
                        ;
                }));
            Promise.all(promises)
                .then((resolve) => {

                    const subscriptionProfilesDate = profiles.sort((a, b) => {



                        return new Date(b.dispensary.createdAt) - new Date(a.dispensary.createdAt);
                    });


                    return res.json({
                        ok: true,
                        profilesDispensaries: subscriptionProfilesDate
                    })
                })

        }








    }
    catch (error) {


        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}



const getProfilesSubscriptorsApproveByUser = async (req, res) => {


    try {

        const uid = req.params.uid;

        const myprofile = await Profile.findOne({ user: uid })


        const isClub = myprofile.isClub;



        if (isClub) {


            const updateSub = {

                isClubNotifi: false
            };


            await Subscription.updateMany(
                {
                    club: uid
                },
                {
                    $set: updateSub
                }
            );

            const updateDis = {

                isClubNotifi: false
            };


            await Dispensary.updateMany(
                {
                    club: uid
                },
                {
                    $set: updateDis
                }
            );




            const subscription = await Subscription
                .find({ club: uid, isUpload: true, subscribeApproved: true, subscribeActive: true })
                .sort({ createdAt: 'asc' })




            const profiles = [];

            const promises = subscription.map((obj) =>

                new Promise((resolve, reject) => {

                    Profile.findOne({ user: obj.subscriptor }
                    )
                        .then(item => {





                            User.findById(obj.subscriptor
                            )

                                .then(user => {



                                    Dispensary.findOne({ club: uid, subscriptor: obj.subscriptor })
                                        .sort('-created_at')

                                        .then((dispensary) => {





                                            const profileDispensary = {




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
                                                    messageDate: obj.createdAt,

                                                    subscribeActive: obj.subscribeActive,
                                                    subscribeApproved: obj.subscribeApproved,
                                                    subId: obj._id,
                                                    isClub: item.isClub,
                                                    isUpload: obj.isUpload,
                                                    createdAt: item.createdAt,
                                                    updatedAt: item.updatedAt,


                                                },

                                                dispensary: (dispensary) ? dispensary : new Dispensary({
                                                    gramsRecipe: 0,
                                                    dateDelivery: "",

                                                    isActive: false,
                                                    isDelivered: false,
                                                    isCancel: false,
                                                    isUpdate: false,
                                                    isUserNotifi: false,
                                                    isClubNotifi: false,
                                                    isEdit: false,
                                                    subscriptor: user._id,
                                                    club: uid,
                                                    createdAt: item.createdAt,
                                                    updatedAt: item.createdAt,
                                                    id: "",
                                                })

                                            }

                                            profiles.push(profileDispensary);
                                            resolve();

                                        });

                                })

                        })
                        ;
                }));

            Promise.all(promises)
                .then((resolve) => {



                    const subscriptionProfilesDate = profiles.sort((a, b) => {



                        return new Date(b.dispensary.createdAt) - new Date(a.dispensary.createdAt);
                    });


                    return res.json({
                        ok: true,

                        profilesDispensaries: subscriptionProfilesDate
                    })
                })


        }

        else {


            const updateSub = {

                isUserNotifi: false
            };


            await Subscription.updateMany(
                {
                    subscriptor: uid
                },
                {
                    $set: updateSub
                }
            );

            const updateDis = {

                isUserNotifi: false
            };


            await Dispensary.updateMany(
                {
                    subscriptor: uid
                },
                {
                    $set: updateDis
                }
            );


            console.log('else!!!')

            const subscription = await Subscription
                .find({ subscriptor: uid, subscribeApproved: true, isUpload: true, subscribeActive: true })
                .sort({ createdAt: 'asc' })



            const profiles = [];



            const promises = subscription.map((obj) =>

                new Promise((resolve, reject) => {

                    Profile.findOne({ user: obj.club }
                    )
                        .then(item => {



                            if (item.user._id != uid) {

                                User.findById(obj.club
                                )

                                    .then(user => {

                                        Dispensary.findOne({ club: obj.club, subscriptor: uid })

                                            .then((dispensary) => {


                                                const profileDispensary = {




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
                                                        messageDate: obj.createdAt,

                                                        subscribeActive: obj.subscribeActive,
                                                        subscribeApproved: obj.subscribeApproved,
                                                        subId: obj._id,
                                                        isClub: item.isClub,
                                                        isUpload: obj.isUpload,
                                                        createdAt: item.createdAt,
                                                        updatedAt: item.updatedAt,


                                                    },

                                                    dispensary: (dispensary) ? dispensary : new Dispensary({
                                                        gramsRecipe: 0,
                                                        dateDelivery: "",

                                                        isActive: false,
                                                        isDelivered: false,
                                                        isCancel: false,
                                                        isUpdate: false,
                                                        isUserNotifi: false,
                                                        isClubNotifi: false,
                                                        isEdit: false,
                                                        subscriptor: user._id,
                                                        club: uid,
                                                        createdAt: item.createdAt,
                                                        updatedAt: item.createdAt,
                                                        id: "",
                                                    })

                                                }



                                                profiles.push(profileDispensary);
                                                resolve();

                                            });

                                    });


                            }
                            else {

                                resolve();
                            }
                        })
                        ;
                }));
            Promise.all(promises)
                .then((resolve) => {




                    const subscriptionProfilesDate = profiles.sort((a, b) => {



                        return new Date(b.dispensary.createdAt) - new Date(a.dispensary.createdAt);
                    });


                    return res.json({
                        ok: true,
                        profilesDispensaries: subscriptionProfilesDate
                    })
                })

        }












    }
    catch (error) {


        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}



const getProfilesSubscriptorsPendingByClub = async (req, res) => {



    try {

        const uid = req.params.uid;

        const myprofile = await Profile.findOne({ user: uid })


        const isClub = myprofile.isClub;



        if (isClub) {


            const updateSub = {

                isClubNotifi: false
            };


            await Subscription.updateMany(
                {
                    club: uid
                },
                {
                    $set: updateSub
                }
            );

            const updateDis = {

                isClubNotifi: false
            };


            await Dispensary.updateMany(
                {
                    club: uid
                },
                {
                    $set: updateDis
                }
            );




            const subscription = await Subscription
                .find({ club: uid, isUpload: true, subscribeApproved: false, subscribeActive: true })
                .sort({ createdAt: 'asc' })




            const profiles = [];

            const promises = subscription.map((obj) =>

                new Promise((resolve, reject) => {

                    Profile.findOne({ user: obj.subscriptor }
                    )
                        .then(item => {





                            User.findById(obj.subscriptor
                            )

                                .then(user => {



                                    Dispensary.findOne({ club: uid, subscriptor: obj.subscriptor })

                                        .then((dispensary) => {





                                            const profileDispensary = {




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
                                                    messageDate: obj.createdAt,

                                                    subscribeActive: obj.subscribeActive,
                                                    subscribeApproved: obj.subscribeApproved,
                                                    subId: obj._id,
                                                    isClub: item.isClub,
                                                    isUpload: obj.isUpload,
                                                    createdAt: item.createdAt,
                                                    updatedAt: item.updatedAt,


                                                },

                                                dispensary: (dispensary) ? dispensary : new Dispensary({
                                                    gramsRecipe: 0,
                                                    dateDelivery: "",

                                                    isActive: false,
                                                    isDelivered: false,
                                                    isCancel: false,
                                                    isUpdate: false,
                                                    isUserNotifi: false,
                                                    isClubNotifi: false,
                                                    isEdit: false,
                                                    subscriptor: user._id,
                                                    club: uid,
                                                    createdAt: item.createdAt,
                                                    updatedAt: item.createdAt,
                                                    id: "",
                                                })

                                            }

                                            profiles.push(profileDispensary);
                                            resolve();

                                        });

                                })

                        })
                        ;
                }));

            Promise.all(promises)
                .then((resolve) => {



                    const subscriptionProfilesDate = profiles.sort((a, b) => {



                        return new Date(b.dispensary.createdAt) - new Date(a.dispensary.createdAt);
                    });


                    return res.json({
                        ok: true,

                        profilesDispensaries: subscriptionProfilesDate
                    })
                })


        }

        else {


            const updateSub = {

                isUserNotifi: false
            };


            await Subscription.updateMany(
                {
                    subscriptor: uid
                },
                {
                    $set: updateSub
                }
            );

            const updateDis = {

                isUserNotifi: false
            };


            await Dispensary.updateMany(
                {
                    subscriptor: uid
                },
                {
                    $set: updateDis
                }
            );


            console.log('else!!!')

            const subscription = await Subscription
                .find({ subscriptor: uid, subscribeApproved: true, isUpload: true, subscribeActive: true })
                .sort({ createdAt: 'asc' })



            const profiles = [];



            const promises = subscription.map((obj) =>

                new Promise((resolve, reject) => {

                    Profile.findOne({ user: obj.club }
                    )
                        .then(item => {



                            if (item.user._id != uid) {

                                User.findById(obj.club
                                )

                                    .then(user => {

                                        Dispensary.findOne({ club: obj.club, subscriptor: uid })

                                            .then((dispensary) => {


                                                const profileDispensary = {




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
                                                        messageDate: obj.createdAt,

                                                        subscribeActive: obj.subscribeActive,
                                                        subscribeApproved: obj.subscribeApproved,
                                                        subId: obj._id,
                                                        isClub: item.isClub,
                                                        isUpload: obj.isUpload,
                                                        createdAt: item.createdAt,
                                                        updatedAt: item.updatedAt,


                                                    },

                                                    dispensary: (dispensary) ? dispensary : new Dispensary({
                                                        gramsRecipe: 0,
                                                        dateDelivery: "",

                                                        isActive: false,
                                                        isDelivered: false,
                                                        isCancel: false,
                                                        isUpdate: false,
                                                        isUserNotifi: false,
                                                        isClubNotifi: false,
                                                        isEdit: false,
                                                        subscriptor: user._id,
                                                        club: uid,
                                                        createdAt: item.createdAt,
                                                        updatedAt: item.createdAt,
                                                        id: "",
                                                    })

                                                }



                                                profiles.push(profileDispensary);
                                                resolve();

                                            });

                                    });


                            }
                            else {

                                resolve();
                            }
                        })
                        ;
                }));
            Promise.all(promises)
                .then((resolve) => {




                    const subscriptionProfilesDate = profiles.sort((a, b) => {



                        return new Date(b.dispensary.createdAt) - new Date(a.dispensary.createdAt);
                    });


                    return res.json({
                        ok: true,
                        profilesDispensaries: subscriptionProfilesDate
                    })
                })

        }












    }
    catch (error) {


        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const getClubSubscriptionBySubid = async (req, res) => {


    try {

        const subid = req.params.subid;


        const subscription = await Subscription
            .find({ subscriptor: subid, subscribeApproved: true, isUpload: true, subscribeActive: true })
            .sort({ createdAt: 'asc' })



        const profiles = [];

        const promises = subscription.map((obj) =>

            new Promise((resolve, reject) => {

                Profile.findOne({ user: obj.club }
                )
                    .then(item => {


                        User.findById(obj.club
                        )

                            .then(user => {

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
                                    messageDate: obj.updatedAt,
                                    isClub: item.isClub,
                                    subscribeActive: obj.subscribeActive,
                                    subscribeApproved: obj.subscribeApproved,
                                    subId: obj._id,
                                    isUpload: obj.isUpload,
                                    createdAt: item.createdAt,
                                    updatedAt: item.updatedAt

                                }

                                profiles.push(profile);
                                resolve();

                            });

                    })
                    ;
            }));
        Promise.all(promises)
            .then((resolve) => {


                const profilesOrder = profiles.sort((a, b) => (a.messageDate > b.messageDate) ? 1 : -1)



                return res.json({
                    ok: true,
                    profiles: profilesOrder
                })
            })









    }
    catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}



const getNotifications = async (req, res = response) => {

    const {

        id
    } = req.params;

    const profileAuth = await Profile.findOne({ user: id });

    isClub = profileAuth.isClub;



    const messagesNotifi = await Message
        .find({ isForNotifi: true, for: id })


    console.log('messages for,', id, messagesNotifi);


    if (isClub) {
        const query = { $or: [{ subscriptor: id }, { isClubNotifi: true }, { isActive: true }, { isEdit: true }, { isDelivered: true }] };
        const dispensaryNotifi = await Dispensary
            .find(query);



        const subscriptionsNotifi = await Subscription
            .find({ isClubNotifi: true, club: id })


        res.json({
            ok: true,
            subscriptionsNotifi,
            messagesNotifi,
            dispensaryNotifi

        });


    }

    else {

        const query = { $or: [{ subscriptor: id }, { isUserNotifi: true }, { isActive: true }, { isEdit: true }, { isDelivered: true }] };
        const dispensaryNotifi = await Dispensary
            .find(query);

        const subscriptionsNotifi = await Subscription
            .find({ isUserNotifi: true, subscriptor: id })


        res.json({
            ok: true,
            subscriptionsNotifi,
            messagesNotifi,
            dispensaryNotifi

        });


    }

}

const getNotificationsMessages = async (req, res = response) => {

    const {

        id
    } = req.params;



    const messagesNotifi = await Message
        .find({ isForNotifi: true, for: id })


    res.json({
        ok: true,
        messagesNotifi,

    });






}

module.exports = {
    getProfilesSubscriptorsByUser,
    getProfilesSubscriptorsApproveByUser,
    getProfilesSubscriptorsPendingByClub,
    getClubSubscriptionBySubid,
    getNotifications,
    getNotificationsMessages
}