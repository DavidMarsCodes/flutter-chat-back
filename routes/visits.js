/*
    path: api/login

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { createVisit, editVisit, getVisitsById, getVisitsByPlant, getVisitsByUser, deleteVisit } = require('../controllers/visit');
const { validateJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/new', createVisit, validateJWT );

router.get('/visits/plant/:id', validateJWT, getVisitsByPlant );

router.get('/visits/user/:id', validateJWT, getVisitsByUser );


router.get('/visit/:id', validateJWT, getVisitsById );

router.delete('/delete/:id', validateJWT, deleteVisit);

router.post('/update/visit', validateJWT, editVisit );

module.exports = router;