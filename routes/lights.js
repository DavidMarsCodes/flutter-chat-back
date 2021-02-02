/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createLight, getlightstByRoom, deleteLight, editLight } = require('../controllers/light');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createLight, validateJWT );

router.get('/lights/room/:id', validateJWT, getlightstByRoom );

router.delete('/delete/:id', validateJWT, deleteLight);

router.post('/update/light', validateJWT, editLight );



module.exports = router;
