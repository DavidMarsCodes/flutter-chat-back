/*
    Path: /api/message
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const { getProfilesSubscriptorsByClub, getClubSubscriptionBySubid, getProfilesSubscriptorsPendingByClub , getNotifications} = require('../controllers/notifications');

const router = Router();



router.get('/profiles/subscriptions/approve/:uid', getProfilesSubscriptorsByClub, validateJWT );


router.get('/profiles/subscriptions/pending/:uid', getProfilesSubscriptorsPendingByClub, validateJWT );

router.get('/profiles/subscriptions/sub/:subid', getClubSubscriptionBySubid, validateJWT );

router.get('/notifications/user/:id', getNotifications, validateJWT );



module.exports = router;


