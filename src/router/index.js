const {Router} = require('express');
const router = Router();

const controlador = require('../controller/admin.controller');

router.get('/', controlador.inicio);
router.get('/productos', controlador.productos);
router.get('/pendientes', controlador.pendientes);
router.get('/carrusel', controlador.carrusel);
router.get('/login', controlador.login);


module.exports = router;