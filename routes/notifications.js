/*
    Path: /api/message
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const { getProfilesSubscriptorsByUser,getProfilesSubscriptorsApproveByUser, getClubSubscriptionBySubid, getProfilesSubscriptorsPendingByClub , getNotifications, getNotificationsMessages } = require('../controllers/notifications');

const router = Router();



router.get('/profiles/subscriptions/notifi/user/:uid', getProfilesSubscriptorsByUser, validateJWT );

router.get('/profiles/subscriptions/approve/user/:uid', getProfilesSubscriptorsApproveByUser, validateJWT );



router.get('/profiles/subscriptions/pending/:uid', getProfilesSubscriptorsPendingByClub, validateJWT );

router.get('/profiles/subscriptions/sub/:subid', getClubSubscriptionBySubid, validateJWT );

router.get('/notifications/user/:id', getNotifications, validateJWT );

router.get('/notifications/messages/user/:id', getNotificationsMessages, validateJWT );




module.exports = router;


