import { Request, Response, NextFunction } from 'express'
import LoginService from '../services/loginService.js'
import { loginInput } from '../models/loginData.js'


class LoginControler {
  private loginServ: LoginService
  constructor(loginServ: LoginService) {
    this.loginServ = loginServ
  }

  // o metdo inclui o next para enviar os erros para o middlewere
  public async loginAuth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response|void> {
    try {
      // Pegando o req.body. Obs vou inserir ID pelo service com o uuid

      // forma  com desestrututação :  const { name, email, password, checkPassword }: userInput = req.body

      const loginData: loginInput = req.body

      // aqui a varivael autent guarda o valor do retorno da função  authenticateUser do service, isso porque eu defini o rotorno la.
      const autent = await this.loginServ.authenticateUser(loginData)

      return res.status(200).json(autent)
      // em caso de erro o cathc captura o erro e passa através do next para o midlewere de validaçao de erros
    } catch (error) {
      next(error)
    }
  }
}

export default LoginControler
