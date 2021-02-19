const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const Profile = require('../models/profile');

const { generateJWT } = require('../helpers/jwt');

const { validGoogleToken } = require('../helpers/google-verify-token');



const googleAuth = async (req, res = response )  => {

console.log(req.body);
    const tokenGoogle = req.body.token;


    if(!tokenGoogle) {
        return res.json({
            ok: false,
            msg: 'Token no exist'
        });
    }

    const googleUser = await validGoogleToken(tokenGoogle);

    console.log('googleUser', googleUser)


    const { email, id , name, lastName, imageAvatar } = googleUser;


    var newUsername = email.split('@')[0];

    

console.log(email)

    console.log('newUsername', newUsername)

    if(!googleUser) {

        return res.status(400).json({
            ok:false
        });
    }


    const user = await User.findOne({ email });
    if( user ) {

       

        const profileFind = await 
        Profile.findOne({user: user.id})
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
              username:  user.username,
           
            },
            isClub: profileFind.isClub,

            messageDate: profileFind.createdAt,

            createdAt: profileFind.createdAt,
            updatedAt:profileFind.updatedAt
           
          }

          const token = await generateJWT( user.id );

      
     
    return res.json({
            ok: true,
            profile,
            token
        })

      
    }

    const newUser = new User( {email: email, password: id, username: newUsername, isAuthGoogle: true });



   
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync( id, salt );

    await newUser.save();
   
    const token = await generateJWT( newUser.id );



    const profileNew = new Profile( {user: newUser.id, name: name, lastName: lastName, imageAvatar: imageAvatar})

    await profileNew.save()

    const profileFind = await 
    Profile.findOne({user: newUser.id})

    console.log('profileFind!!', profileFind)

    // Generar mi JWT
    const profile = {
        
        name: profileFind.name,
        lastName: profileFind.lastName,
        imageHeader: "",
        about: "",
        imageAvatar: profileFind.imageAvatar,
        imageRecipe: profileFind.imageRecipe,
        id: profileFind._id,
        user: {
          online: newUser.online,
          uid: newUser.id,
          email: newUser.email,
          username:  newUser.username,
       
        },
        isClub: profileFind.isClub,

        messageDate: profileFind.createdAt,

        createdAt: profileFind.createdAt,
        updatedAt:profileFind.updatedAt
       
      }

      console.log('profile!!', profile)

 
    res.json({
        ok: true,
        profile,
        token
    })
}

module.exports = {
    googleAuth
}

