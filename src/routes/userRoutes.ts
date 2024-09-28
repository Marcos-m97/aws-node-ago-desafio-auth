import { Router, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import conn from '../db.js'
import bcrypt from 'bcrypt'

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

// eu poderia atribuir o retorno a uma variavel e no codigo criar um outra variave para receber o valor
// e assim ao inves de colocar validPass(password) == false eu colocaria variaveç == false
function validPass(senha: string): boolean {
  const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)/
  return regexPassword.test(senha)
}

router.post('/add', async function (req: Request, res: Response) {
  const { name, email, password }: User = req.body
  const id: string = uuidv4()

  try {
    const verifyEmail: string = 'SELECT * FROM users WHERE email = ?'

    const [data]= await conn.query<any>(verifyEmail, [email])
    if (data.length > 0) {
      res.status(409).json({ error: 'email already registered' })
      return
    }
  } catch (err) {
    res.status(500).send('internal error')
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
    res
      .status(400)
      .json({
        error:
          'password must be at least 6 characters long with letters and numbers'
      })
    return
  }

  try {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const qry: string =
      'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)'

    await conn.query(qry, [id, name, email, hashedPassword])
    res.status(201).json({ id: id })
    return
  } catch (err) {
    res.status(500).send('Erro ao registrar usuário.')
  }
})


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

export default router



/* o retorno do conn.query é um array [INFOSimportante,outros] desta forama, utilizando o destructuring
  apenas com um elemente estou pegando apenas o primeiro elemento do array que sao as infos que eu preciso
é equivalente a fazer:
const data = await conn.query(qry, [name]);
let result = data[0]

    res.status(200).json(result);
  */
