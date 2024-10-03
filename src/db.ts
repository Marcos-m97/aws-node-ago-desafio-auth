// import o mysql2 com suporte a promisses
import mysql from 'mysql2/promise'

// crio a pool com as credenciais do .env
 const conn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

//crinado a funçao assync de conexao. exporto esta funçao para acessa=la no startserver no index
export async function connectDB() {
  try {
    const connection = await conn.getConnection()
    console.log('Conectou!')
    connection.release()
  } catch (err) {
    throw new Error ("internal server error")
  }
}

export default conn
