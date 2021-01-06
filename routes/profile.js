
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const { getProfilesLastUsers , loginGetProfileUser , editUserProfile} = require('../controllers/profile');


const router = Router();

router.get('/last/users', validateJWT, getProfilesLastUsers);

router.post('/login',  loginGetProfileUser);

router.post('/edit', validateJWT,  editUserProfile);



module.exports = router;





