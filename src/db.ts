
import mysql from 'mysql2/promise'

const conn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

async function connectDB() {
  try {
    const connection = await conn.getConnection()
    console.log('Conectou!')
    connection.release()
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:')
  }
}

// Chama a função de conexão
connectDB()


export default conn
