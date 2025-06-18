const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const supabase = require('./config/database'); // Adicionado para a rota /events
const HomeController = require('./controllers/HomeController');
const EventController = require('./controllers/EventController');
const adminRoutes = require('./routes/adminRoutes');

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public'))); // Adicionado: serve arquivos da pasta public/

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'sambaSegredo123',
  resave: false,
  saveUninitialized: false
}));

// Rotas públicas
app.get('/', HomeController.index);
app.get('/eventos', EventController.listarTodos);
app.get('/eventos/:cidade', EventController.listarPorCidade);
app.get('/evento/:id', EventController.verEvento);

// Rota para fetch automático de eventos via JS
app.get('/events', async (req, res) => {
  const filtro = req.query.cidade;

  let query = supabase.from('events').select('*');

  if (filtro) {
    if (filtro.toLowerCase() === 'reveillon') {
      query = query.ilike('nome', '%reveillon%'); // busca por nome
    } else {
      query = query.eq('cidade', filtro);
    }
  }

  const { data, error } = await query;

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});


// Rotas administrativas
app.use('/admin', adminRoutes);

// Inicializa servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
