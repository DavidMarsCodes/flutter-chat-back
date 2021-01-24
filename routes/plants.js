/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createPlant, getPlantsByRoom, deletePlant, editPlant } = require('../controllers/plants');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createPlant, validateJWT );

router.get('/plants/room/:id', validateJWT, getPlantsByRoom );

router.delete('/delete/:id', validateJWT, deletePlant);

router.post('/update/plant', validateJWT, editPlxant );



module.exports = router;
