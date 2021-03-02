
const { Router } = require('express');
const { check } = require('express-validator');

const { createProduct, getPlantsByRoom, getPlantsByUser, deletePlant, editPlant, getPlantById } = require('../controllers/products');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createProduct, validateJWT );

router.get('/plants/room/:id', validateJWT, getPlantsByRoom );

router.get('/plants/user/:id', validateJWT, getPlantsByUser );


router.get('/plant/:id', validateJWT, getPlantById );


router.delete('/delete/:id', validateJWT, deletePlant);

router.post('/update/plant', validateJWT, editPlant );



module.exports = router;
