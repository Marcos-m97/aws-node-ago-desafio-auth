// importando o dotenv com as credenciais do DB
import 'dotenv/config'

// importanto o express
import express from 'express'

//instanciando o express
const app = express()

// imprtando a conexao com o db enquanto nao enho as rotas 
import connection from './db.js'


// definindo a porta
const port = 3000

// midllewere body-parser
app.use(express.json())

app.get("/", function (req, res) {
  const qry = 'SELECT * FROM users'
  connection.query(qry, function (err, data) {
    if (err) {
      res.status(500).send("ops")
    }
  console.log(data)
  res.send(data)
  })
})

//conexao com o servidor 
    app.listen(port, () => { 
      console.log(`Servidor rodando na porta ${port}`)
    })
  

