/*
    Path: /api/message
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const { getProfilesSubscribe , disapproveSubscription} = require('../controllers/notifications');

const router = Router();



router.get('/profiles/subscriptions/:uid', getProfilesSubscribe, validateJWT );

router.post('/disapprove/:id', [
   
], disapproveSubscription, validateJWT );

module.exports = router;


