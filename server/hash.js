const bcrypt = require('bcrypt');

const password = '1234';

bcrypt.hash(password, 10, (err, hash) => {
  if (err) throw err;
  console.log('Hash generado:', hash);
});
