/*
    Path: /api/message
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const { getProfilesSubscribe } = require('../controllers/notifications');

const router = Router();



router.get('/profiles/subscriptions/:uid', getProfilesSubscribe, validateJWT );


module.exports = router;


