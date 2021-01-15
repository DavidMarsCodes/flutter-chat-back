
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const {   uploadAvatar, uploadHeader } = require('../controllers/aws');



const router = Router();

router.post("/upload/avatar", validateJWT, uploadAvatar ) 
router.post("/upload/header", validateJWT, uploadHeader ) 

  

module.exports = router;
