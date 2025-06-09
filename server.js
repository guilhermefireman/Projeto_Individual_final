const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const HomeController = require('./controllers/HomeController');
const EventController = require('./controllers/EventController');
const adminRoutes = require('./routes/adminRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'sambaSegredo123',
  resave: false,
  saveUninitialized: false
}));

// Rotas principais
app.get('/', HomeController.index);
app.get('/eventos', EventController.listarTodos);
app.get('/eventos/:cidade', EventController.listarPorCidade);
app.get('/evento/:id', EventController.verEvento);

// ROTAS DO ADMIN (antes do listen)
app.use('/admin', adminRoutes);

// Inicializa servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
