/*
    path: api/login

*/
const { Router } = require('express');

const { createSubscription, getSubscribeByClubIdAndSubId } = require('../controllers/subscribe');
const { validateJWT } = require('../middlewares/validar-jwt');



const router = Router();



router.post('/new', [
   
], createSubscription, validateJWT );


router.get('subscription/:clubId/:subId', validateJWT, getSubscribeByClubIdAndSubId );




module.exports = router;