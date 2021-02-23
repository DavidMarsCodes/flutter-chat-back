/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createCatalogo, getCatalogosByUser , editPositionByCatalogo, deleteCatalogo} = require('../controllers/catalogo');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createCatalogo, validateJWT );


router.get('/catalogos/user/:id', validateJWT, getCatalogosByUser );

router.post('/update/position', validateJWT, editPositionByCatalogo);

router.delete('/delete/:id', validateJWT, deleteCatalogo);


module.exports = router;
