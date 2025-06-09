const supabase = require('../config/database');

// DASHBOARD
exports.dashboard = async (req, res) => {
  try {
    const { data: eventos, error } = await supabase.from('events').select('cidade');
    if (error) throw error;

    const total = eventos.length;
    const cidades = [...new Set(eventos.map(e => e.cidade))];

    res.render('admin/dashboard', {
      nome: req.session.user.name,
      total,
      cidades
    });
  } catch (err) {
    res.status(500).send('Erro ao carregar dashboard: ' + err.message);
  }
};

// LISTAR EVENTOS
exports.listarEventos = async (req, res) => {
  try {
    const { data: eventos, error } = await supabase
      .from('events')
      .select('*')
      .order('data', { ascending: true });

    if (error) throw error;

    res.render('admin/gerenciar_eventos', { eventos });

  } catch (err) {
    res.status(500).send('Erro ao listar eventos: ' + err.message);
  }
};

// FORMULÁRIO PARA NOVO EVENTO
exports.formNovoEvento = (req, res) => {
  res.render('admin/form_evento', { evento: null });
};

// CRIAR EVENTO
exports.criarEvento = async (req, res) => {
  const { nome, descricao, data, local, cidade, imagem_url, whatsapp_link } = req.body;

  try {
    const { error } = await supabase.from('events').insert([{
      nome,
      descricao,
      data,
      local,
      cidade,
      imagem_url,
      whatsapp_link
    }]);

    if (error) throw error;

    res.redirect('/admin/eventos');
  } catch (err) {
    res.status(500).send('Erro ao criar evento: ' + err.message);
  }
};

// FORMULÁRIO PARA EDITAR EVENTO
exports.formEditarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const { data: evento, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    res.render('admin/form_evento', { evento });
  } catch (err) {
    res.status(500).send('Erro ao carregar evento: ' + err.message);
  }
};

// ATUALIZAR EVENTO
exports.atualizarEvento = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, data, local, cidade, imagem_url, whatsapp_link } = req.body;

  try {
    const { error } = await supabase
      .from('events')
      .update({ nome, descricao, data, local, cidade, imagem_url, whatsapp_link })
      .eq('id', id);

    if (error) throw error;

    res.redirect('/admin/eventos');
  } catch (err) {
    res.status(500).send('Erro ao atualizar evento: ' + err.message);
  }
};

// DELETAR EVENTO
exports.deletarEvento = async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase.from('events').delete().eq('id', id);

    if (error) throw error;

    res.redirect('/admin/eventos');
  } catch (err) {
    res.status(500).send('Erro ao deletar evento: ' + err.message);
  }
};

