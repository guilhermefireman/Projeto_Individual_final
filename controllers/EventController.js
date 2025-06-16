// controllers/EventController.js
const Event = require('../models/Event');

module.exports = {
  // Lista todos os eventos
  listarTodos: async (req, res) => {
    try {
      const eventos = await Event.buscarTodos();
      res.render('eventos', { eventos, cidade: null });
    } catch (err) {
      res.status(500).send('Erro ao carregar eventos: ' + err.message);
    }
  },

  // Lista eventos por cidade
  listarPorCidade: async (req, res) => {
    const { cidade } = req.params;
    try {
      const eventos = await Event.buscarPorCidade(cidade);
      res.render('eventos', { eventos, cidade });
    } catch (err) {
      res.status(500).send('Erro ao carregar eventos da cidade: ' + err.message);
    }
  },

  // Exibe evento individual
  verEvento: async (req, res) => {
    const { id } = req.params;
    try {
      const evento = await Event.buscarPorId(id);
      res.render('eventos_indi', { evento });
    } catch (err) {
      res.status(500).send('Erro ao carregar o evento: ' + err.message);
    }
  }
};
