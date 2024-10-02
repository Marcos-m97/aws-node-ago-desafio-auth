// importando o dotenv com as credenciais do DB
import 'dotenv/config'

// importanto o express/  req,res e next para mo middlewere para tratamento de erros personalizado
import express from 'express'
import router from './routes/userRoutes.js'
import { connectDB } from './db.js'
import errorMiddlewere from './middleweres/apperrors.js'

//instanciando o express
const app = express()

// definindo a porta
const port = 3000

// midllewere body-parser
app.use(express.json())

//midlewere das rotas
app.use('/api/v1/users', router)

// midlewere de tratamento dos erros. este é um midlewere especial que contem 4 parametros. o extre é o Error.
app.use(errorMiddlewere)

async function startServer() {
  try {
    // espera a conexao com o banco de dados para depois inciar o servidor
    await connectDB()
    //conexao com o servidor
    app.listen(port, function () {
      console.log(`Servidor rodando na porta ${port}`)
    })
  } catch (err) {
    throw err
  }
}

// chamo a funçao para iniciar a conexao com o poll do db e iniciar o servidor
startServer()
