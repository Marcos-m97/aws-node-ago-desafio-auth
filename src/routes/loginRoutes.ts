//aqui é necessario importar o router e os controlers
import { Router } from 'express'
import LoginControler from '../controllers/loginControlers'
import LoginRepositorie from '../repositories/loginRepositories'
import LoginService from '../services/loginService'
const router = Router()

const LoginRepo = new LoginRepositorie()
const LoginServ = new LoginService(LoginRepo)
const loginControl = new LoginControler(LoginServ)

//rota para criar usuaio com arro function- esta sintaxe é para bindar o this de forma coreta utilizando as DI
router.post('/login', (req, res, next) =>
  loginControl.loginAuth(req, res, next)
)

export default router
