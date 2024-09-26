
import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})


connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err)
    return
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso!')
}) 


export default connection
