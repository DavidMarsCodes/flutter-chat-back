/*
    path: api/login

*/
const { Router } = require('express');

const { createSubscription } = require('../controllers/subscribe');
const { validateJWT } = require('../middlewares/validar-jwt');



const router = Router();



router.post('/new', [
   
], createSubscription, validateJWT );




module.exports = router;
