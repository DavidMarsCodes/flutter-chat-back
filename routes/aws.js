
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const {   uploadAvatar } = require('../controllers/aws');



const router = Router();



router.post("/upload/avatar", validateJWT, uploadAvatar ) 

  

module.exports = router;
