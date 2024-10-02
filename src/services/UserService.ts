import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

// importo a clase appErrors para criar novos erro aqui
import AppErrors from '../uteis/errors.js'

// aqui importo a interface UserIput do repositorie para nao ter que reescreve-la e  a classe User para instanciala aqui
import userRepo from '../repositories/userRepositories.js'
// aqui tambem utilizo a interface para tipar os dados da funçao createUser com as regras de negocio
import { User, userType } from '../models/user.js'

// objeto que contem a logica dos serrvices
class userService {
  // a funçao é assync e recebe como parametro um objeto do tipo usser, esse objeto vem do contoler
  // a funçao retorna uma promise que pode ser do tipo user,se retornar algo, ou any se rornar erros
  public async createUser({
    name,
    email,
    password
  }: userType): Promise<any | userType> {
    // validUser  é um método da classe User criada no model e  cuida das validaçoes mais simples e tem as regez do email e senha e lança os new errors com exeçao
    // do double email que faz uma consulta ao banco.
    User.validUser(name, email, password)

    // doubleEmail guarda o retorno da checkemail
    try {
      const doubleEmail = await userRepo.checkEmail(email)
      // o retorno da checkEmail é null ou user, aqui o if verifica se é trhuthy porem null e falsy, se voltar null
      // o if nao é acionado.
      if (doubleEmail) {
        throw new AppErrors('Email already registered', 409)
      }
      // este catch é para capturar erros desconhecidos o throw aqui permite que o express capture o erro
    } catch (err) {
      throw err
    }

    try {
      // criptografia da senha com o bcript
      const saltRounds = 10
      const hashedPassword = await bcrypt.hash(password, saltRounds)

      // Criando um novo usuário - aqui utiliando um objeto do tipo da interface User para passar para o repp.
      // modificaçao aqui instancio um novo usuario
      const newUser = new User(name, email, hashedPassword, uuidv4())

      // Acionando o repository para salvar no banco
      await userRepo.create(newUser)
      return newUser
    } catch (err) {
      throw err
    }
  }
}

export default new userService()
