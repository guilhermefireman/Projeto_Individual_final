const express = require('express');
const router = express.Router();
const EventController = require('../controllers/EventController');

router.get('/', EventController.renderizarHome);
router.get('/eventos', EventController.renderizarEventos);

module.exports = router;
