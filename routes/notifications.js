/*
    Path: /api/message
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const { getProfilesSubscriptorsByClub, getClubSubscriptionBySubid, getProfilesSubscriptorsPendingByClub } = require('../controllers/notifications');

const router = Router();



router.get('/profiles/subscriptions/approve/:uid', getProfilesSubscriptorsByClub, validateJWT );


router.get('/profiles/subscriptions/pending/:uid', getProfilesSubscriptorsPendingByClub, validateJWT );

router.get('/profiles/subscriptions/sub/:subid', getClubSubscriptionBySubid, validateJWT );


module.exports = router;


