/*
    Path: /api/message
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const { getProfilesSubscriptorsByClub, getClubSubscriptionBySubid } = require('../controllers/notifications');

const router = Router();



router.get('/profiles/subscriptions/:uid', getProfilesSubscriptorsByClub, validateJWT );

router.get('/profiles/subscriptions/sub/:subid', getClubSubscriptionBySubid, validateJWT );


module.exports = router;


