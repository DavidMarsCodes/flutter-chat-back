
const Message = require('../models/message');
const Profile = require('../models/profile');
const Subscription = require('../models/subscription');
const User = require('../models/user');

const getChat = async (req, res) => {

    const miId = req.uid;
    const messageBy = req.params.by;


    const last30 = await Message.find({
        $or: [{ by: miId, for: messageBy }, { by: messageBy, for: miId }]
    })
        .sort({ createdAt: 'desc' })
        .limit(30);

    res.json({
        ok: true,
        messages: last30
    })

}

const getProfilesChat = async (req, res) => {


    try {




        const uid = req.params.uid;


        const update = {

            isForNotifi: false
        };


        await Message.updateMany(
            {
                for: uid
            },
            {
                $set: update
            }
        );


        const messages = await Message.find({
            $or: [{ by: uid }, { for: uid }]
        })




        const myprofile = await Profile.findOne({ user: uid })


        const isClub = myprofile.isClub;


        messagesUnique = [];
        messagesUnique = Object.values(messages.reduce((acc, cur) => Object.assign(acc, { [cur.by.toString()]: cur }), {}));



        const profiles = [];

        if (!isClub) {
            const promises = messagesUnique.map((obj) =>

                new Promise((resolve, reject) => {


                    if (obj.for != uid) {

                        Profile.findOne({ user: obj.for }
                        )
                            .sort({ updateAt: 'asc' })
                            .then(item => {


                                User.findById(obj.for
                                )

                                    .then(user => {


                                        Subscription.findOne({
                                            club: obj.for, subscriptor: uid
                                        })
                                            .then((subscription) => {


                                                const subscribeApproved = (subscription) ? subscription.subscribeApproved : false;
                                                const subscribeActive = (subscription) ? subscription.subscribeActive : false;


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

        else {


            const promises = messagesUnique.map((obj) =>


                new Promise((resolve, reject) => {


                    if (obj.for != uid) {

                        Profile.findOne({ user: obj.for }
                        )
                            .sort({ updateAt: 'asc' })
                            .then(item => {



                                User.findById(item.user._id
                                )

                                    .then(user => {



                                        Subscription.findOne({
                                            club: uid, subscriptor: obj.by
                                        })
                                            .then((subscription) => {


                                                const subscribeApproved = (subscription) ? subscription.subscribeApproved : false;
                                                const subscribeActive = (subscription) ? subscription.subscribeActive : false;


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
                    }



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










    }
    catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}


module.exports = {
    getChat,
    getProfilesChat
}