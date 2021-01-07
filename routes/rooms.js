/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createRoom, getRoomsByUser, deleteRoom, editPositionByRoom } = require('../controllers/rooms');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createRoom, validateJWT );

router.get('/rooms/user/:id', validateJWT, getRoomsByUser );

router.delete('/delete/:id', validateJWT, deleteRoom)

router.post('/update/position', validateJWT, editPositionByRoom)




module.exports = router;
