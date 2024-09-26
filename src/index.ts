// importando o dotenv com as credenciais do DB
import 'dotenv/config'

// importanto o express
import express from 'express'
import { v4 as uuidv4 } from 'uuid' 

//instanciando o express
const app = express()

// imprtando a conexao com o db enquanto nao enho as rotas
import connection from './db.js'

// definindo a porta
const port = 3000

// midllewere body-parser
app.use(express.json())


app.post('/api/v1/users/add', function (req, res) {
  const id = uuidv4() // Gera o UUID
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).send('error: name is required')
  }

  const qry =
    'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)'

  connection.query(qry, [id, name, email, password], function (err, data) {
    if (err) {
      res.status(500).send('ops')
    }
    console.log(id)
    res.status(201).send('cadastrado')
  })
})


// rota teste
app.get('/', function (req, res) {
  const qry = 'SELECT * FROM users'
  connection.query(qry, function (err, data) {
    if (err) {
      res.status(500).send('ops')
    }
    console.log(data)
    res.send(data)
  })
})

//conexao com o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
