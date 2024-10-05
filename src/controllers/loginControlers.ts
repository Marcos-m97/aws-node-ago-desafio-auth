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
  ): Promise<any> {
    try {
      // Pegando o req.body. Obs vou inserir ID pelo service com o uuid

      // forma  com desestrututação :  const { name, email, password, checkPassword }: userInput = req.body

      const loginData: loginInput = req.body

      // Chame o serviço para criar o usuário. a variavel new_user guarda o valor do retorno
      // da funçao createUser do service, que lá é retonado o objeto newUser depois de acionar o repostorty e inseri-lo no db por iso o new_user contem a propriedade ID que eu lanço no JSON
      const autent: loginInput = await this.loginServ.authenticateUser(loginData)

      return res.status(200).json({ token: "oi" })
      // em caso de erro o cathc captura o erro e passa através do next para o midlewere de validaçao de erros
    } catch (error: any) {
      next(error)
    }
  }
}

export default LoginControler
