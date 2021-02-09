/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { createVisit, editVisit, getVisitsById, getVisitsByPlant, deleteVisit } = require('../controllers/visit');
const { validarCampos } = require('../middlewares/validar-campos');
const { validateJWT } = require('../middlewares/validar-jwt');
const { renewToken } = require('../controllers/auth');

const router = Router();


router.post('/new', createVisit, validateJWT );

router.get('/visits/plant/:id', validateJWT, getVisitsByPlant );

router.get('/visit/:id', validateJWT, getVisitsById );

router.delete('/delete/:id', validateJWT, deleteVisit);



router.post('/update/visit', validateJWT, editVisit );

module.exports = router;