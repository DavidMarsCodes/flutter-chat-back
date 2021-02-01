/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { createAir, getAirsByUser, deleteAir, editPositionByAir, editAir } = require('../controllers/air');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createAir, validateJWT );

router.get('/airs/room/:id', validateJWT, getAirsByUser );

router.delete('/delete/:id', validateJWT, deleteAir);

router.post('/update/air', validateJWT, editAir );



module.exports = router;
