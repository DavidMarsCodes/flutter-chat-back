
const { Router } = require('express');

const {   callbackAppleAuth, SignInappleAuth } = require('../controllers/apple-auth');



const router = Router();


router.post("/callbacks/sign_in_with_apple", callbackAppleAuth)

router.post("/sign_in_with_apple", SignInappleAuth ) 

  

module.exports = router;
