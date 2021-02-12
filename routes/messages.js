/*
    Path: /api/message
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const { getChat, getProfilesChat } = require('../controllers/message');

const router = Router();


router.get('/:by', validateJWT, getChat );

router.get('/profiles/:uid', getProfilesChat, getChat );


module.exports = router;


