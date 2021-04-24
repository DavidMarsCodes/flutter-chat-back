

/*
    path: api/login

*/
const { Router } = require('express');

const { createDispensary } = require('../controllers/dispensary');
const { validateJWT } = require('../middlewares/validar-jwt');



const router = Router();



router.post('/new', [

], createDispensary, validateJWT);



module.exports = router;
