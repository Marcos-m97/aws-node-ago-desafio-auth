require('dotenv').config() 

const express = require('express')
const app = express()


const port = 3000

const conn = require('./db/connDB')

// Middleware para parsing de JSON
app.use(express.json())



// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
