
const { Router } = require('express');
const { check } = require('express-validator');

const { createProduct, getProductsByCatalogo } = require('../controllers/products');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createProduct, validateJWT );

router.get('/products/catalogo/:id', validateJWT, getProductsByCatalogo );




module.exports = router;
