module.exports = {
    listarEventos: (req, res) => {
      // Exemplo estático
      const eventos = [
        { nome: 'Workshop de Node.js', data: '2025-06-15' },
        { nome: 'Feira de Startups', data: '2025-07-02' }
      ];
      res.render('eventos', { eventos });
    }
  };
  