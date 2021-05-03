/*
    path: api/login

*/
const { Router } = require('express');

const { UpdateImageSubscription, getSubscribeByClubIdAndSubId, UnSubscription, disapproveSubscription, approveSubscription, getSubscriptionsUsersDispensaries } = require('../controllers/subscribe');
const { validateJWT } = require('../middlewares/validar-jwt');



const router = Router();



router.post('/new', [

], UpdateImageSubscription, validateJWT);


router.post('/unsubscribe', [

], UnSubscription, validateJWT);



router.get('/subscription/:userauth/:userid', validateJWT, getSubscribeByClubIdAndSubId);

router.get('/subscriptions/profile/dispensaries/:clubId', validateJWT, getSubscriptionsUsersDispensaries);



router.post('/disapprove', [

], disapproveSubscription, validateJWT);

router.post('/approve', [

], approveSubscription, validateJWT);


module.exports = router;
