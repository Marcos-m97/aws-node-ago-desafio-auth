//aqui é necessario importar o router e os controlers
import { Router } from 'express'
import UserRepositorie from '../repositories/userRepositories.js'
import UserService from '../services/UserService.js'
import UserControler from '../controllers/userControlers.js'
import authenticateToken from '../middleweres/authMiddlewere.js'
// instanciando o router
const router = Router()

// instanciando as classes DI
const userRepo = new UserRepositorie()
const userServ = new UserService(userRepo)

// o userControl instancia um novo controler e é injetado no serv. a instancia do control inicia a rota aqui embaixo
const userControl = new UserControler(userServ)

//rota para criar usuaio com arro function- esta sintaxe é para bindar o this de forma coreta utilizando as DI
//router.post('/add', (req, res, next) => userControl.registerUser(req, res, next))

router.post('/add', authenticateToken, async (req, res, next) => {
  try {
    await userControl.registerUser(req, res, next)
  } catch (error) {
    next(error)
  }
})

export default router
