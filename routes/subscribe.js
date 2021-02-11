/*
    path: api/login

*/
const { Router } = require('express');

const { createSubscribe } = require('../controllers/subscribe');
const { validateJWT } = require('../middlewares/validar-jwt');



const router = Router();



router.post('/new', [
   
], createSubscribe, validateJWT );




module.exports = router;
