// importando o dotenv com as credenciais do DB
import 'dotenv/config'

// importanto o express/  req,res e next para mo middlewere para tratamento de erros personalizado
import express, { Request, Response, NextFunction } from 'express'
import AppErrors from './uteis/errors.js'
import router from './routes/userRoutes.js'
import { connectDB } from './db.js'

//instanciando o express
const app = express()

// definindo a porta
const port = 3000

// midllewere body-parser
app.use(express.json())

//midlewere das rotas
app.use('/api/v1/users', router)

// midlewere de tratamento dos erros. este é um midlewere especial que contem 4 parametros. o extre é o Error.
app.use(function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // verifico se error é uma instancia de classe errors, criado no arquivo uteis
  // as instancias da classe apperrors sao incializadas no service atrave dos throws new
  if (error instanceof AppErrors) {
    //se for ela tem acesso as propriedades que eu defini na classe code e message.
    res.status(error.code).json({ error: error.message })
    return
  } else {
    res.status(500).json({ error: 'internal server error' })
  }
})


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
