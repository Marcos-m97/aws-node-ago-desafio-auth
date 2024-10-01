//aqui é necessario importar o router e os controlers
import { Router } from 'express'
import userControler from '../controllers/userControlers.js'

// instanciando o router
const router = Router()

//rota para criar usuarui
router.post('/add', userControler.registerUser);

export default router


