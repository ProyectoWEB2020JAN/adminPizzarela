const {Router} = require('express');
const router = Router();

const controlador = require('../controller/admin.controller');

router.get('/', controlador.inicio);

router.get('/admin', controlador.admin);



module.exports = router;