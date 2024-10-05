 import { loginInput } from "../models/loginData"
import LoginRepositorie from "../repositories/loginRepositories"

class LoginService {
  private loginRepo: LoginRepositorie
  constructor(loginRepo: LoginRepositorie) {
    this.loginRepo = loginRepo
  }

  public async authenticateUser(loginData: loginInput):Promise<any>{
    try {

    } catch {

    }
  }
}

 export default LoginService
