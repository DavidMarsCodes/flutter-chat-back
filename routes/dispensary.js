

/*
    path: api/login

*/
const { Router } = require('express');

const { createDispensary, getDispensaryActive, UpdateDispensary, UpdateDeliveredDispensary, getDispensariesProductsByUser } = require('../controllers/dispensary');
const { validateJWT } = require('../middlewares/validar-jwt');



const router = Router();



router.post('/new', [

], createDispensary, validateJWT);



router.post('/update-dispensary', [

], UpdateDispensary, validateJWT);


router.get('/update-delivered-dispensary/:id', [

], UpdateDeliveredDispensary, validateJWT);


router.get('/active/products/user/:uid', [

], getDispensaryActive, validateJWT);

router.get('/dispensaries/products/club/:clubId/user/:subId', [

], getDispensariesProductsByUser, validateJWT);



module.exports = router;
