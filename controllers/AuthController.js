// controllers/AuthController.js
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Importa o model

exports.formLogin = (req, res) => {
  res.render('admin/login');
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.buscarPorEmail(email);

    if (!user) {
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
  } catch (error) {
    console.error('Erro no login:', error.message);
    res.status(500).render('admin/login', { error: 'Erro ao tentar logar.' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
};
