/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createCatalogo, getCatalogosByUsers ,getMyCatalogos, getCatalogoById,  editCatalogo, editPositionByCatalogo, deleteCatalogo} = require('../controllers/catalogo');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createCatalogo, validateJWT );

router.get('/catalogo/:id', validateJWT, getCatalogoById );

router.get('/catalogos/user/:id/userAuth/:authid', validateJWT, getCatalogosByUsers );

router.get('/catalogos/user/:id', validateJWT, getMyCatalogos );


router.post('/update/position', validateJWT, editPositionByCatalogo);

router.delete('/delete/:id', validateJWT, deleteCatalogo);

router.post('/update/catalogo', validateJWT, editCatalogo );



module.exports = router;
