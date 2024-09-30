import { Router } from 'express'
import userControler from '../controllers/userControlers.js'

const router = Router()

router.post('/add', userControler.registerUser);

export default router


