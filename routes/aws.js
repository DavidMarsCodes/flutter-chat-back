
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const {   uploadAvatar, uploadHeader , uploadCoverPlant, updateCoverPlant, uploadCoverVisit, updateCoverVisit, updateCoverProduct} = require('../controllers/aws');



const router = Router();

router.post("/upload/avatar", validateJWT, uploadAvatar ) 
router.post("/upload/header", validateJWT, uploadHeader ) 

router.post("/upload/cover-plant", validateJWT, uploadCoverPlant )

router.post("/upload/update-cover-plant", validateJWT, updateCoverPlant )

router.post("/upload/cover-visit", validateJWT, uploadCoverVisit )

router.post("/upload/update-cover-visit", validateJWT, updateCoverVisit )

router.post("/upload/update-cover-product", validateJWT, updateCoverProduct )




  

module.exports = router;
