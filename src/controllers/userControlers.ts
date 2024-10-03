import {Request, Response, NextFunction } from 'express'
import UserService from '../services/UserService.js'
import { User, userInput } from '../models/user.js'


class UserControler {

  private userServ: UserService
  constructor(userServ: UserService) {
    this.userServ = userServ
  }

  public async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      // Pegando o req.body. Obs vou inserir ID pelo service com o uuid

      // forma  com desestrututação :  const { name, email, password, checkPassword }: userInput = req.body

      const userData: userInput = req.body

      // Chame o serviço para criar o usuário. a variavel new_user guarda o valor do retorno
      // da funçao createUser do service, que lá é retonado o objeto newUser depois de acionar o repostorty e inseri-lo no db por iso o new_user contem a propriedade ID que eu lanço no JSON
      const new_user:User = await this.userServ.createUser(userData)

      return res.status(201).json({ id: new_user.id })
      // em caso de erro o cathc captura o erro e passa através do next para o midlewere de validaçao de erros
    } catch (error: any) {
      next(error)
    }
  }
}

export default UserControler
