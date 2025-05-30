const supabase = require('../config/database');

exports.renderizarHome = (req, res) => {
  res.render('home', { titulo: 'Bem-vindo ao Site de Eventos' });
};

exports.renderizarEventos = async (req, res) => {
  try {
    const { data: eventos, error } = await supabase.from('events').select('*');
    if (error) throw error;

    res.render('eventos', { eventos });
  } catch (err) {
    res.status(500).send('Erro ao carregar eventos: ' + err.message);
  }
};
