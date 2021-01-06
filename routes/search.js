


const { Router } = require('express');
const { validateJWT } = require('../middlewares/validar-jwt');

const { getSearchPrincipalByQuery } = require('../controllers/search');



const router = Router();

router.get('/principal/:query', validateJWT, getSearchPrincipalByQuery);



module.exports = router;




