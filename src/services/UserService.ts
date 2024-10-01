import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import userRepo from '../repositories/userRepositories.js'
import AppErrors from '../uteis/errors.js'
import { validUser } from '../uteis/validFunctions.js'

// aqui tambem utilizo a interface para tipar os dados da funçao createUser com as regras de negocio
interface User {
  id?: string
  name: string
  email: string
  password: string
}

// objeto que contem a logica dos serrvices
const userService = {
  // a funçao é assync e recebe como parametro um objeto do tipo usser, esse objeto vem do contoler
  // a funçao retorna uma promise que pode ser do tipo user,se retornar algo, ou any se rornar erros
  async createUser({ name, email, password }: User): Promise<any | User> {

    // a funçao valid user que esta localiza na pasta uteis cuida das validaçoes mais simples e tem as regez do email e senha e lança os new errors com exeçao
    // do double email que faz uma consulta ao banco.
    validUser(name, email, password)

    // doubleemal guarda o retorno da checkemail
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
      const newUser: User = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword
      }

      // Acionando o repository para salvar no banco
      await userRepo.create(newUser)
      return newUser
    } catch (err) {
      throw err
    }
  }
}

export default userService
