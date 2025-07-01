const app = require('./app');

const PORT = app.get('port') || 4000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
