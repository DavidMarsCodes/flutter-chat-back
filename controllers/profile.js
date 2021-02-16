const { response } = require('express');
const Profile = require('../models/profile');
const Room = require('../models/room');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const getProfilebyUser = async (req, res = response) => {
    const userId = req.params.id;

    try {
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({
                ok: false,
                msg: 'Perfil no encontrado'
            });
        }

        // Validar el password
        const rooms =
            await Room
                .find({ user: userId })
        if (!rooms) {
            return res.status(400).json({
                ok: false,
                msg: 'Not found Room of user'
            });
        }



        res.json({
            ok: true,
            profile,
            rooms
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}


const getProfilesLastUsers = async (req, res = response) => {

    const from = Number(req.query.from) || 0;

    try {
        const profilesFind = await Profile
            .find({ user: { $ne: req.uid }, isClub: true })

            .skip(from)
            .limit(50)
            .populate('user')

        // .sort('-online')

        const profiles = [];

        // console.log('profilesFind', profilesFind);



        profilesFind.map((item) =>




            new Promise((resolve, reject) => {




                Subscription.findOne({
                    club: item.user.uid
                })
                    .then((subscription) => {


                        const subscribeApproved = (subscription) ? subscription.subscribeApproved : false;
                        const subscribeActive = (subscription) ? subscription.subscribeActive : false;



                        const profile = {
                            name: item.name,
                            lastName: item.lastName,
                            imageHeader: item.imageHeader,
                            imageAvatar: item.imageAvatar,
                            about: item.about,
                            id: item._id,
                            user: {
                                online: item.user.online,
                                uid: item.user._id,
                                email: item.user.email,
                                username: item.user.username,

                            },
                            subscribeApproved: subscribeApproved,
                            subscribeActive: subscribeActive,
                           
                            messageDate: item.createdAt,
                            createdAt: item.createdAt,
                            updatedAt: item.updatedAt

                        }

                        profiles.push(profile);
                        resolve();
                    })











            }));


        Promise.all(promises)
            .then((resolve) => {


                console.log('profiles!!', profiles)
                return res.json({
                    ok: true,
                    profiles: profiles
                })
            })


    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}





const loginGetProfileUser = async (req, res = response) => {

    const { email, password } = req.body;


    try {

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }


        // Generar el JWT
        const token = await generateJWT(user.id);
        //    const profile = await getProfilebyUser(userDB.id);



        console.log('user', user)


        const profileFind = await Profile
            .findOne({ user: user.id })
            .populate('user')


        console.log('profileFind', profileFind)

        // Generar mi JWT
        const profile = {

            name: profileFind.name,
            lastName: profileFind.lastName,
            about: profileFind.about,
            imageHeader: profileFind.imageHeader,
            imageAvatar: profileFind.imageAvatar,
            id: profileFind._id,
            isClub: profileFind.isClub,

            rooms: profileFind.rooms,
            user: {
                online: user.online,
                uid: user.id,
                email: user.email,
                username: user.username,

            },
            messageDate: profileFind.createdAt,

            createdAt: profileFind.createdAt,
            updatedAt: profileFind.updatedAt

        }

        //console.log('profile', profile)


        res.json({
            ok: true,
            token,
            profile
        })
    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }



}


const editUserProfile = async (req, res = response) => {
    const { email, password, username, name, about } = req.body;

    const uid = req.body.uid
    try {


        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();

        const passEncript = bcrypt.hashSync(password, salt);


        if (password === '') {

            await

                User.updateOne(
                    {
                        _id: uid
                    },
                    {
                        $set: {
                            email: email,
                            username: username,
                        }
                    }
                );

        }

        else {


            await

                User.updateOne(
                    {
                        _id: uid
                    },
                    {
                        $set: {
                            email: email,
                            username: username,
                            password: passEncript
                        }
                    }
                );

        }



        // await user.save();

        // const token = await generateJWT(user.id);

        const profileUpdate = await


            Profile.updateOne(
                {
                    user: uid
                },
                {
                    $set: {
                        name: name,
                        about: about


                    }
                }
            );




        const profileFind = await
            Profile.findOne({ user: uid })
                .populate('user')




        // Generar mi JWT
        const profile = {

            name: profileFind.name,
            lastName: profileFind.lastName,
            about: profileFind.about,
            imageHeader: profileFind.imageHeader,
            imageAvatar: profileFind.imageAvatar,
            id: profileFind._id,
            isClub: profileFind.isClub,

            user: {
                online: profileFind.user.online,
                uid: uid,
                email: profileFind.user.email,
                username: profileFind.user.username,

            },
            messageDate: profileFind.createdAt,

            createdAt: profileFind.createdAt,
            updatedAt: profileFind.updatedAt

        }

        // console.log(profile);

        res.json({
            ok: true,
            profile,

        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}



module.exports = {
    getProfilebyUser,
    getProfilesLastUsers,
    loginGetProfileUser,
    editUserProfile

}


