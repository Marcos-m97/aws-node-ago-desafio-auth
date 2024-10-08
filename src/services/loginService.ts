import 'dotenv/config'
import { loginInput } from '../models/loginData.js'
import UserRepositorie from '../repositories/userRepositories.js'
import AppErrors from '../uteis/errors.js'
import { comparePassword } from '../uteis/loginFunctions.js'
import jwt from 'jsonwebtoken'

// aqui defini o tipo para o tipo da resposta da função authenticateUser que vou devolver para o contoler imprimir como json
type AuthResponse = {
  accessToken: string
  expiresIn: number
}
// aqui ingetei o UserRepositorie pois é de la que vou pegar as infos do banco que preciso aqui por isso ainda nao utilize o loginrepo
class LoginService {
  private userRepo: UserRepositorie
  constructor(userRepo: UserRepositorie) {
    this.userRepo = userRepo
  }

  public async authenticateUser(
    loginData: loginInput
  ): Promise<AuthResponse | null> {
    //verificar o retorno depois trocar o any
    try {
      const registeredUser = await this.userRepo.checkEmail(loginData.email)
      if (!registeredUser) {
        throw new AppErrors('error: invalid email or password', 403)
      }

      // esta função verifica se a senha confere com a armazenada com o hash no DB
      const validPassword = await comparePassword(
        loginData.password,
        registeredUser.password
      )
      if (validPassword == false) {
        throw new AppErrors('error: invalid email or password', 403)
      }

      // aqui o token JWT é gerado
      const token = jwt.sign(
        { email: registeredUser.email },
        process.env.JWT_SECRET!, // aqui a ! força a tipagem - garante que nao seja undefined ou null
        { expiresIn: '10m' }
      )

      // aqui retorno o objeto que sera transformado em JSON no controler
      return {
        accessToken: token,
        expiresIn: 600
      }
    } catch (err) {
      throw err
    }
  }
}
export default LoginService
