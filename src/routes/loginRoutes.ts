//aqui é necessario importar o router e os controlers
import { Router } from 'express'
import LoginControler from '../controllers/loginControlers'
import LoginRepositorie from '../repositories/loginRepositories'
import LoginService from '../services/loginService'
import UserRepositorie from '../repositories/userRepositories'
const router = Router()

// aqui preciso criar uma instancia do userRepo porque estou usando o metodo checkemail que peretence a ele.
// no momento nao estou usando o loginrepo pois o loginservice nao interage com o banco, mas escrevi aqui para testar como ficaria - se necessário remover 
const userRepo = new UserRepositorie()
const LoginRepo = new LoginRepositorie()
const LoginServ = new LoginService(LoginRepo, userRepo)
const loginControl = new LoginControler(LoginServ)

//rota para criar usuaio com arro function- esta sintaxe é para bindar o this de forma coreta utilizando as DI
router.post('/login', (req, res, next) =>
  loginControl.loginAuth(req, res, next)
)

export default router
