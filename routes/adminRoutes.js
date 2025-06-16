const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const { proteger } = require('../middlewares/authMiddleware');
const AuthController = require('../controllers/AuthController');

// Painel principal
router.get('/dashboard', proteger, AdminController.dashboard);

// Eventos
router.get('/login', AuthController.formLogin);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/eventos', proteger, AdminController.listarEventos);
router.get('/eventos/novo', proteger, AdminController.formNovoEvento);
router.post('/eventos', proteger, AdminController.criarEvento);
router.get('/eventos/:id/editar', proteger, AdminController.formEditarEvento);
router.post('/eventos/:id', proteger, AdminController.atualizarEvento);
router.post('/eventos/:id/deletar', proteger, AdminController.deletarEvento);
router.delete('/eventos/:id', proteger, AdminController.deletarEventoJson);


module.exports = router;
