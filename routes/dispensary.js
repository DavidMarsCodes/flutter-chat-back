

/*
    path: api/login

*/
const { Router } = require('express');

const { createDispensary, getDispensaryActive } = require('../controllers/dispensary');
const { validateJWT } = require('../middlewares/validar-jwt');



const router = Router();



router.post('/new', [

], createDispensary, validateJWT);


router.get('/active/products/user/:uid', [

], getDispensaryActive, validateJWT);


module.exports = router;
