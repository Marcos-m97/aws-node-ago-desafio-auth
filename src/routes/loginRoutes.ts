//aqui é necessario importar o router e os controlers
import { Router } from 'express'
import LoginControler from '../controllers/loginControlers.js'
import LoginService from '../services/loginService.js'
import UserRepositorie from '../repositories/userRepositories.js'
const loginRouter = Router()

// aqui preciso criar uma instancia do userRepo porque estou usando o metodo checkemail que peretence a ele.
// no momento nao estou usando o loginrepo pois o loginservice nao interage com o banco, mas escrevi aqui para testar como ficaria - se necessário remover
const userRepo = new UserRepositorie()
const LoginServ = new LoginService(userRepo)
const loginControl = new LoginControler(LoginServ)

//rota para criar usuaio com arro function- esta sintaxe é para bindar o this de forma coreta utilizando as DI
// router.post('/login', (req, res, next) =>loginControl.loginAuth(req, res, next))

// estou usando estaforma para poder tipar corretamente a promisse retrnada pela função do controler.
// se eu substituir o voi por any da certo da forma antiga comentada acima.
loginRouter.post('/', async (req, res, next) => {
  try {
    await loginControl.loginAuth(req, res, next)
  } catch (error) {
    next(error)
  }
})


export default loginRouter

//http://localhost:3000/api/v1/login
