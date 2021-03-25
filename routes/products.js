
const { Router } = require('express');
const { check } = require('express-validator');

const { createProduct, editProduct, getProductsByCatalogo, getLastProducts, deleteProduct } = require('../controllers/products');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createProduct, validateJWT);

router.get('/products/catalogo/:id', validateJWT, getProductsByCatalogo);

router.get('/principal/products/:uid', validateJWT, getLastProducts);

router.post('/update/product', validateJWT, editProduct);

router.delete('/delete/:id', validateJWT, deleteProduct);


module.exports = router;
