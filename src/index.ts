// importando o dotenv com as credenciais do DB
import 'dotenv/config'

// importanto o express
import express from 'express'
import router from './routes/userRoutes.js'

//instanciando o express
const app = express()

// definindo a porta
const port = 3000

// midllewere body-parser
app.use(express.json())

//midlewere das rotas
app.use('/api/v1/users', router)

//conexao com o servidor
app.listen(port, function () {
  console.log(`Servidor rodando na porta ${port}`)
})
