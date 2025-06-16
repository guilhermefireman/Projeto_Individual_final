const bcrypt = require('bcrypt');

const senha = 'admin123'; // 👈 troque pela senha que quiser
bcrypt.hash(senha, 10).then(hash => {
  console.log('Hash gerado:', hash);
});
