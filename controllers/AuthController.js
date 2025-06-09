const supabase = require('../config/database');
const bcrypt = require('bcrypt');

exports.formLogin = (req, res) => {
  res.render('admin/login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();

  if (error || !user) {
    return res.render('admin/login', { error: 'Usuário não encontrado.' });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.render('admin/login', { error: 'Senha incorreta.' });
  }

  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  res.redirect('/admin/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};
