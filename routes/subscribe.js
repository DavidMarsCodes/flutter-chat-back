/*
    path: api/login

*/
const { Router } = require('express');

const { createSubscription, getSubscribeByClubIdAndSubId } = require('../controllers/subscribe');
const { validateJWT } = require('../middlewares/validar-jwt');



const router = Router();



router.post('/new', [
   
], createSubscription, validateJWT );


router.post('subscription', validateJWT, getSubscribeByClubIdAndSubId );




module.exports = router;
