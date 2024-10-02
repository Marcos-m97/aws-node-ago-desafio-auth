import {Request, Response, NextFunction } from 'express'
import UserService from '../services/UserService.js'
import { User } from '../models/user.js'


class UserControler {

  private userServ: UserService
  constructor(userServ: UserService) {
    this.userServ = userServ
  }

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // Pegando o req.body. Obs vou inserir ID pelo service com o uuid
      const { name, email, password }: User = req.body

      // Chame o serviço para criar o usuário. a variavel new_user guarda o valor do retorno
      // da funçao createUser do service, que lá é retonado o objeto newUser depois de acionar o repostorty e inseri-lo no db
      const new_user: User = await this.userServ.createUser({

        name,
        email,
        password
      })

      return res.status(201).json({ id: new_user.id })
      // em caso de erro o cathc captura o erro e passa através do next para o midlewere de validaçao de erros
    } catch (error: any) {
      next(error)
    }
  }
}

export default UserControler
