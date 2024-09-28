import { Router, Request, Response, query } from 'express'
import { v4 as uuidv4 } from 'uuid'
import conn from '../db.js'

const router = Router()

interface User {
  id?: string
  name: string
  email: string
  password: string
}

function validarEmail(e_mail: string): boolean {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regexEmail.test(e_mail)
}

function validPass(senha: string): boolean {
  const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)/
  return regexPassword.test(senha)
}

router.post('/add', async function (req: Request, res: Response) {
    const { name, email, password }: User = req.body
    const id: string = uuidv4()

  try {

const verifyEmail:string = 'SELECT * FROM users WHERE email = ?'

const data = await conn.query<any>(verifyEmail, [email])
let dados =  data[0]

  if (dados.length > 0) {
  res.status(409).json({ error: 'email already registered' })
  return
}


    if (!name) {
      res.status(400).json({ error: 'name is required.' })
      return
    }

    if (!email || validarEmail(email) == false) {
      res.status(400).json({ error: 'email is invalid.' })
      return
    }

    if (!password || password.length < 6 || validPass(password) == false) {
      res.status(400).json({ error: 'password must be at least 6 characters long with letters and numbers' })
      return
    }

    const qry: string =
      'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)'

       await conn.query(qry, [id, name, email, password])
    res.status(201).json({ id: id })
    return

  } catch (err) {
      res.status(500).send('Erro ao registrar usuário.')
  }
})

export default router

  //rota teste
  router.get('/', async function (req: Request, res: Response) {

    // desta a forma (parametro de rota) a query tem qu ser: http://localhost:3000/api/v1/users/marcos
    //let name = req.params.name   e a rota aqui em cima deve ficar '/:name'. é mais util para pesquisar por um unico parametro tipo ID

    // desta forma (query strings) é mais util para multiplos filtros fica possivel capturar pelo query porem a rota deve ser alterada para '/'
    // caso tenha um numero utilizar o parse ex: let price = parseFloat(req.query.price as string);
    let name = req.query.name as string

    try {
      const qry = 'SELECT * FROM users WHERE name = ?'

      const [data] = await conn.query(qry, [name])
      console.log(data)
      res.status(200).json(data)
      return
    } catch (err) {
      res.status(500).send('Erro ao buscar dados: ' + err)
    }
  })



     /* o retorno do conn.query é um array [INFOSimportante,outros] desta forama, utilizando o destructuring
  apenas com um elemente estou pegando apenas o primeiro elemento do array que sao as infos que eu preciso
é equivalente a fazer:
const data = await conn.query(qry, [name]);
let result = data[0]

    res.status(200).json(result);
  */
