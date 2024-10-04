
import mysql from 'mysql2/promise'
import 'dotenv/config'

 const conn = mysql.createPool({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
   port: Number(process.env.DB_PORT)
 })


export async function connectDB() {
  try {
    const connection = await conn.getConnection()
    console.log('Conectou!')
    connection.release()
  } catch (err) {
    throw err
  }
}

export default conn

/* com sequelize a conexao com o banco tambem muda um pouco:
import { Sequelize } from 'sequelize';

// Instancia o Sequelize com as credenciais do .env
const sequelize = new Sequelize(
  process.env.DB_NAME as string,    // Nome do banco de dados
  process.env.DB_USER as string,    // Usuário
  process.env.DB_PASSWORD as string,  // Senha
  {
    host: process.env.DB_HOST,      // Host
    dialect: 'mysql',               // Define o dialect como 'mysql' (ou outro, como 'postgres', se for o caso)
    logging: false,                 // Desabilita logs de SQL, mas você pode ativá-los se precisar depurar
  }
);

// Função para testar a conexão
export async function connectDB() {
  try {
    await sequelize.authenticate(); // Testa a conexão
    console.log('Conectado ao banco de dados com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar no banco de dados:', err);
    throw new Error('Internal server error');
  }
}

export default sequelize;

no index vai a funçao com o sync:

async function startServer() {
  try {
    // Espera a conexão com o banco de dados usando o Sequelize
    await connectDB();

    // Inicia o servidor apenas após a conexão bem-sucedida
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (err) {
    console.error('Erro ao iniciar o servidor:', err); // Loga o erro no console
    process.exit(1); // Encerra o processo em caso de erro grave
  }
}

// Chama a função para iniciar o servidor
startServer();


*/
