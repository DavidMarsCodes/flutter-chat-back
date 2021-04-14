const { response } = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const User = require('../models/user');
const Profile = require('../models/profile');

const { generateJWT } = require('../helpers/jwt');

const AppleAuth = require("apple-auth");
const jwt = require("jsonwebtoken");


const callbackAppleAuth = async (request, response) => {


  const redirect = `intent://callback?${new URLSearchParams(
    request.body
  ).toString()}#Intent;package=${process.env.ANDROID_PACKAGE_IDENTIFIER
    };scheme=signinwithapple;end`;


  response.redirect(307, redirect);

}

const SignInappleAuth = async (req, res = response) => {
  try {

    const auth = new AppleAuth(
      {
        client_id:
          req.body.useBundleId === true
            ? process.env.BUNDLE_ID
            : process.env.SERVICE_ID,
        team_id: process.env.TEAM_ID,
        redirect_uri:
          "https://api.gettymarket.com/api/apple/callbacks/sign_in_with_apple",
        key_id: process.env.KEY_ID
      },
      fs.readFileSync('./keys/keysignin.p8').toString(),
      "text"
    );


    const accessToken = await auth.accessToken(req.body.code);

    const idToken = jwt.decode(accessToken.id_token);

    const userID = idToken.sub;


    const email = idToken.email;
    const userName = `${req.body.firstName} ${req.body.lastName}`;

    const sessionID = `NEW SESSION ID for ${userID} / ${email} / ${userName}`;





    const user = await User.findOne({ email });
    if (user) {



      const profileFind = await
        Profile.findOne({ user: user.id })
          .populate('user')


      const profile = {

        name: profileFind.name,
        lastName: profileFind.lastName,
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
        isClub: profileFind.isClub,
        rutClub: profileFind.rutClub,


        messageDate: profileFind.createdAt,

        createdAt: profileFind.createdAt,
        updatedAt: profileFind.updatedAt

      }

      const token = await generateJWT(user.id);



      return res.json({
        ok: true,
        profile,
        token
      })


    }
    var newUsername = email.split('@')[0];


    const newUser = new User({ email: email, password: userID, username: newUsername, isAuthApple: true });




    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(userID, salt);

    await newUser.save();

    const token = await generateJWT(newUser.id);



    const profileNew = new Profile({ user: newUser.id, name: newUsername, lastName: '' })

    await profileNew.save()

    const profileFind = await
      Profile.findOne({ user: newUser.id })


    // Generar mi JWT
    const profile = {

      name: profileFind.name,
      lastName: profileFind.lastName,
      imageHeader: profileFind.imageHeader,
      imageAvatar: profileFind.imageAvatar,
      imageRecipe: profileFind.imageRecipe,
      id: profileFind._id,
      user: {
        online: newUser.online,
        uid: newUser.id,
        email: newUser.email,
        username: newUser.username,

      },
      isClub: profileFind.isClub,
      rutClub: profileFind.rutClub,


      messageDate: profileFind.createdAt,

      createdAt: profileFind.createdAt,
      updatedAt: profileFind.updatedAt

    }






    return res.json({
      ok: true,
      profile,
      token
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }


}



module.exports = {
  callbackAppleAuth,
  SignInappleAuth
}

