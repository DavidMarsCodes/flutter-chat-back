/*
    path: api/usuarios

*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const { getUsers } = require('../controllers/usuarios');

const router = Router();


router.get('/', validateJWT, getUsers );

module.exports = router;
