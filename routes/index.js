const express = require('express');
const router = express.Router();

const HomeController = require('../controllers/HomeController');
const EventController = require('../controllers/EventController');

router.get('/', HomeController.index);
router.get('/eventos', EventController.listarEventos);

module.exports = router;
