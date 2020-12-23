/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createRoom, getRoomsByUser } = require('../controllers/rooms');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createRoom, validateJWT );

router.get('/rooms/user', validateJWT, getRoomsByUser );





module.exports = router;
