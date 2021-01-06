/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { getProfilebyUser, getProfilesLastUsers } = require('../controllers/profile');

const {   callbackAppleAuth, SignInappleAuth } = require('../controllers/apple-auth');



const router = Router();



router.post('/new', [
    check('username','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
], createUser );

router.post('/', [
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
], login );


router.get('/renew', validateJWT, renewToken );

router.get('/profile/user/:id', validateJWT, getProfilebyUser);


router.post("/callbacks/sign_in_with_apple", callbackAppleAuth)

router.post("/sign_in_with_apple", SignInappleAuth ) 

  

module.exports = router;
