const { response } = require('express');
const bcrypt = require('bcryptjs');
const fs = require('fs');
c

const AppleAuth = require("apple-auth");
const jwt = require("jsonwebtoken");


const callbackAppleAuth = async (request, response) => {

    const redirect = `intent://callback?${new URLSearchParams(
        request.body
      ).toString()}#Intent;package=${
        process.env.ANDROID_PACKAGE_IDENTIFIER
      };scheme=signinwithapple;end`;

      console.log(`Redirecting to ${redirect}`);

      response.redirect(307, redirect);

}

const SignInappleAuth = async (req, res = response )  => {

const auth = new AppleAuth(
        {
          // use the bundle ID as client ID for native apps, else use the service ID for web-auth flows
          // https://forums.developer.apple.com/thread/118135
          client_id:
            request.query.useBundleId === "true"
              ? process.env.BUNDLE_ID
              : process.env.SERVICE_ID,
          team_id: process.env.TEAM_ID,
          redirect_uri:
            "https://api.gettymarket.com/api/apple/callbacks/sign_in_with_apple",
          key_id: process.env.KEY_ID
        },
        fs.readFileSync('../keys/keysignin.p8').toString(),
        "text"
      );
      console.log('auth', auth);

      console.log(request.query);


      const accessToken = await auth.accessToken(request.query.code);

      const idToken = jwt.decode(accessToken.id_token);

      const userID = idToken.sub;

      console.log(idToken);

      // `userEmail` and `userName` will only be provided for the initial authorization with your app
      const userEmail = idToken.email;
      const userName = `${request.query.firstName} ${request.query.lastName}`;

      // 👷🏻‍♀️ TODO: Use the values provided create a new session for the user in your system
      const sessionID = `NEW SESSION ID for ${userID} / ${userEmail} / ${userName}`;

      console.log(`sessionID = ${sessionID}`);

      response.json({ sessionId: sessionID });
/* 

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
            imageHeader: profileFind.imageHeader,
            imageAvatar: profileFind.imageAvatar,
            id: profileFind._id,
            user: {
              online: user.online,
              uid: user.id,
              email: user.email,
              username:  user.username,

            },
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
        imageHeader: profileFind.imageHeader,
        imageAvatar: profileFind.imageAvatar,
        id: profileFind._id,
        user: {
          online: newUser.online,
          uid: newUser.id,
          email: newUser.email,
          username:  newUser.username,

        },
        createdAt: profileFind.createdAt,
        updatedAt:profileFind.updatedAt

      }

      console.log('profile!!', profile)
 */

    res.json({
        ok: true,
      //  profile,
       // token
    })
}



module.exports = {
    callbackAppleAuth,
    SignInappleAuth
}

