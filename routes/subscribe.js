/*
    path: api/login

*/
const { Router } = require('express');

const { UpdateImageSubscription, getSubscribeByClubIdAndSubId, UnSubscription, disapproveSubscription, approveSubscription } = require('../controllers/subscribe');
const { validateJWT } = require('../middlewares/validar-jwt');



const router = Router();



router.post('/new', [
   
], UpdateImageSubscription, validateJWT );


router.post('/unsubscribe', [
   
], UnSubscription, validateJWT );



router.get('/subscription/:userauth/:userid', validateJWT, getSubscribeByClubIdAndSubId );




router.post('/disapprove', [
   
], disapproveSubscription, validateJWT );

router.post('/approve', [
   
], approveSubscription, validateJWT );


module.exports = router;
