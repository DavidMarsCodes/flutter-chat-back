
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const {   uploadAvatar, uploadHeader , uploadCoverPlant} = require('../controllers/aws');



const router = Router();

router.post("/upload/avatar", validateJWT, uploadAvatar ) 
router.post("/upload/header", validateJWT, uploadHeader ) 

router.post("/upload/cover-plant", validateJWT, uploadCoverPlant )


  

module.exports = router;
