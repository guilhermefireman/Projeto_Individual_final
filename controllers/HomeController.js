const supabase = require('../config/database');

module.exports = {
  index: async (req, res) => {
    try {
      const cidades = ['Maceio', 'Recife', 'Sao Paulo'];

      const { data: reveillons, error } = await supabase
        .from('events')
        .select('*')
        .ilike('nome', '%réveillon%');

      if (error) throw error;

      res.render('home', {
        titulo: 'Bem-vindo à SambaPass',
        cidades,
        reveillons
      });
    } catch (err) {
      res.status(500).send('Erro ao carregar dados: ' + err.message);
    }
  }
};
