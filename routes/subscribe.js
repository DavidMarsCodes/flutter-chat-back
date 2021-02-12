/*
    path: api/login

*/
const { Router } = require('express');

const { UpdateImageSubscription, getSubscribeByClubIdAndSubId, UnSubscription } = require('../controllers/subscribe');
const { validateJWT } = require('../middlewares/validar-jwt');



const router = Router();



router.post('/new', [
   
], UpdateImageSubscription, validateJWT );


router.post('/unsubscribe', [
   
], UnSubscription, validateJWT );


router.get('/subscription/:id/:club', validateJWT, getSubscribeByClubIdAndSubId );




module.exports = router;
