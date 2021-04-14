const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Profile = require('../models/profile');

const { generateJWT } = require('../helpers/jwt');



const createUser = async (req, res = response) => {
    const { email, password, username } = req.body;

    try {

        const existeEmail = await User.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const user = new User({ email: email, password: password, username: username, isAuthNormal: true });




        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        const token = await generateJWT(user.id);


        const profileNew = new Profile({ user: user.id })

        await profileNew.save()

        const profileFind = await
            Profile.findOne({ user: user.id })
                .populate('user')


        // Generar mi JWT
        const profile = {

            name: profileFind.name,
            lastName: profileFind.lastName,
            imageHeader: "",
            about: "",
            imageAvatar: profileFind.imageAvatar,
            imageRecipe: profileFind.imageRecipe,

            id: profileFind._id,
            rooms: profileFind.rooms,
            user: {
                online: user.online,
                uid: user.id,
                email: user.email,
                username: user.username,

            },
            messageDate: profileFind.createdAt,
            isClub: profileFind.isClub,
            rutClub: profileFind.rutClub,



            createdAt: profileFind.createdAt,
            updatedAt: profileFind.updatedAt

        }


        res.json({
            ok: true,
            profile,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const login = async (req, res = response) => {

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

        const profileFind = await
            Profile.findOne({ user: user.id })
                .populate('user')




        const profile = {

            name: profileFind.name,
            lastName: profileFind.lastName,
            imageHeader: profileFind.imageHeader,
            imageRecipe: profileFind.imageRecipe,

            about: profileFind.about,
            imageAvatar: profileFind.imageAvatar,
            id: profileFind._id,
            rooms: profileFind.rooms,
            user: {
                online: user.online,
                uid: user.id,
                email: user.email,
                username: user.username,

            },
            isClub: profileFind.isClub,
            rutClub: profileFind.rutClub,


            messageDate: profileFind.createdAt,
            createdAt: profileFind.createdAt,
            updatedAt: profileFind.updatedAt

        }
        res.json({
            ok: true,
            profile,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}


const renewToken = async (req, res = response) => {

    const uid = req.uid;

    // generar un nuevo JWT, generarJWT... uid...
    const token = await generateJWT(uid);

    // Obtener el usuario por el UID, Usuario.findById... 
    const user = await User.findById(uid);


    //  const profile = await Profile.find({userId: uid})

    const profileFind = await
        Profile.findOne({ user: user.id })
            .populate('user')




    const profile = {

        name: profileFind.name,
        lastName: profileFind.lastName,
        about: profileFind.about,
        imageHeader: profileFind.imageHeader,
        imageAvatar: profileFind.imageAvatar,
        imageRecipe: profileFind.imageRecipe,

        id: profileFind._id,
        user: {
            online: user.online,
            uid: user.id,
            email: user.email,
            username: user.username,

        },
        message: "",
        isClub: profileFind.isClub,
        rutClub: profileFind.rutClub,

        messageDate: profileFind.createdAt,

        createdAt: profileFind.createdAt,
        updatedAt: profileFind.updatedAt

    }

    console.log(profile);

    res.json({
        ok: true,
        profile,
        token,

    });

}


module.exports = {
    createUser,
    login,
    renewToken
}



