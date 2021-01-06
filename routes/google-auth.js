
const { Router } = require('express');
const { check } = require('express-validator');

const { googleAuth  } = require('../controllers/google-auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();



router.post('/sign-in', [
check('token','El Token es obligatorio').not().isEmpty(),
validarCampos
], googleAuth );



module.exports = router;
