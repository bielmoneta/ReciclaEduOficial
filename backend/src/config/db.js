import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // nome do banco
  process.env.DB_USER,      // usuário
  process.env.DB_PASSWORD,  // senha
  {
    host: process.env.DB_HOST, // localhost ou nome do container
    dialect: "mysql",
    port: process.env.PORT || 3306,
    logging: false
  }
);

sequelize.authenticate()
  .then(() => console.log("✅ Conexão com MySQL bem-sucedida!"))
  .catch((err) => console.error("❌ Erro ao conectar ao MySQL:", err.message));

export default sequelize;
