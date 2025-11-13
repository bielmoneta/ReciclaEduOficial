require('dotenv').config();
const app = require('./src/app');
const sequelize  = require('./src/config/db');
const PORT = process.env.PORT || 4000;

// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Conectado ao Postgres');
//     await sequelize.sync();
//     app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
//   } catch (err) {
//     console.error('Erro ao iniciar servidor:', err);
//     process.exit(1);
//   }
// })();