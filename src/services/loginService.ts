import { loginInput } from '../models/loginData'
import LoginRepositorie from '../repositories/loginRepositories'
import UserRepositorie from '../repositories/userRepositories'
import AppErrors from '../uteis/errors'
import { comparePassword } from '../uteis/loginFunctions'

class LoginService {
  private loginRepo: LoginRepositorie
  private userRepo: UserRepositorie

  constructor(loginRepo: LoginRepositorie, userRepo: UserRepositorie) {
    this.loginRepo = loginRepo
    this.userRepo = userRepo
  }

  public async authenticateUser(loginData: loginInput): Promise<any | null> {
    //verificar o retorno depois trocar o any
    try {
      const registeredUser = await this.userRepo.checkEmail(loginData.email)
      if (!registeredUser) {
        throw new AppErrors('error: invalid email or password', 403)
      }

      const validPassword = await comparePassword(
        loginData.password,
        registeredUser.password
      )
      if (validPassword == false)
        throw new AppErrors('error: invalid email or password', 403)
    } catch (err) {
      throw err
    }
  }
}
export default LoginService
