const express = require('express');
const app = express();
const path = require('path');
const supabase = require('./config/database'); // Sua conexão Supabase aqui

// Configura o EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos da pasta assets
app.use(express.static(path.join(__dirname, 'assets')));

// Página inicial com título e slogan
app.get('/', (req, res) => {
  res.render('home', { titulo: 'BEM-VINDO, SAMBISTA!' });
});

// Página de eventos com dados do Supabase
app.get('/eventos', async (req, res) => {
  try {
    const { data: eventos, error } = await supabase.from('events').select('*');
    if (error) throw error;
    res.render('eventos', { eventos });
  } catch (err) {
    res.status(500).send('Erro ao carregar eventos: ' + err.message);
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
