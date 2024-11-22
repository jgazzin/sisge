const express = require('express');
const router = express.Router();
const user_controller = require('../controller/user_controller');

router.get('/', user_controller.obtenerUsuarios);
router.get('/:id', user_controller.obtenerUserID);
router.post('/', user_controller.crearUsuario);
// router.put('/:id', user_controller.modificarUser);
// router.delete('/:id', user_controller.borrarUser);

module.exports = router;