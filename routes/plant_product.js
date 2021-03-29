const { Router } = require('express');
const { check } = require('express-validator');

const { addPlantsInProduct } = require('../controllers/plant_product');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');



const router = Router();



router.post('/add_update', [

], addPlantsInProduct, validateJWT);





module.exports = router;
