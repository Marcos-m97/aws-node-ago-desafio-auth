//aqui é necessario importar o router e os controlers
import { Router } from 'express'
import UserRepositorie from '../repositories/userRepositories.js'
import UserService from '../services/UserService.js'
import UserControler from '../controllers/userControlers.js'
// instanciando o router
const router = Router()

// instanciando as classes DI
const userRepo = new UserRepositorie()
const userServ = new UserService(userRepo)
const userControler = new UserControler(userServ)

//rota para criar usuaio com arro function- esta sintaxe é para bindar o this de forma coreta utilizando as DI
router.post('/add', (req, res, next) =>
  userControler.registerUser(req, res, next)
)

export default router
