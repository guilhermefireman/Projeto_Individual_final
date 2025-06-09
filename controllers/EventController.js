const supabase = require('../config/database');

module.exports = {
  listarTodos: async (req, res) => {
    try {
      const { data: eventos, error } = await supabase.from('events').select('*');
      if (error) throw error;
      res.render('eventos', { eventos });
    } catch (err) {
      res.status(500).send('Erro ao carregar eventos: ' + err.message);
    }
  },

  listarPorCidade: async (req, res) => {
    const { cidade } = req.params;
    try {
      const { data: eventos, error } = await supabase
        .from('events')
        .select('*')
        .eq('cidade', cidade);
      if (error) throw error;
      res.render('eventos', { eventos });
    } catch (err) {
      res.status(500).send('Erro ao carregar eventos da cidade: ' + err.message);
    }
  },

  verEvento: async (req, res) => {
    const { id } = req.params;
    try {
      const { data: evento, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      if (error || !evento) throw error || new Error("Evento não encontrado");
      res.render('eventos_indi', { evento }); // Nome atualizado
    } catch (err) {
      res.status(500).send('Erro ao carregar o evento: ' + err.message);
    }
  }
};
