/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { addFavorite } = require('../controllers/favorite');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/new', [

], addFavorite, validateJWT);





module.exports = router;
