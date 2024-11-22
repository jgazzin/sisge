const express = require('express');
const router = express.Router();
const perfiles_controller = require('../controller/perfiles_controller');

router.get('/', perfiles_controller.obtenerPerfil);
router.get('/:id', perfiles_controller.obtenerPerfilID);
router.post('/', perfiles_controller.crearPerfil);
// router.put('/:id', perfiles_controller.modificarUser);
// router.delete('/:id', perfiles_controller.borrarUser);

module.exports = router;