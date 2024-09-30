import {Request, Response } from 'express'
import  userService  from '../services/UserService.js'

interface User {
  id?: string
  name: string
  email: string
  password: string
}

const userControler = {
  async registerUser(req: Request, res: Response):Promise<any> {
    try {

      // Pegando o req.body. Obs vou inserir ID pelo servide com o uuid
      const {name, email, password }:User = req.body

      // Chame o serviço para criar o usuário
      const new_user = await userService.createUser({ name, email, password })

      return res.status(201).json({id: new_user.id })
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }
}

export default userControler
