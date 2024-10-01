import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import userRepo from '../repositories/userRepositories.js'
import AppErrors from '../uteis/errors.js'

//regex de validaçao do email
function validarEmail(e_mail: string): boolean {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regexEmail.test(e_mail)
}

// eu poderia atribuir o retorno a uma variavel e no codigo criar um outra variave para receber o valor
// e assim ao inves de colocar validPass(password) == false eu colocaria variaveç == false
function validPass(senha: string): boolean {
  const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)/
  return regexPassword.test(senha)
}

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
  async createUser({name, email, password }:User):Promise<any|User> {

     if (!name) {
   // o controler cria novas instancias dos erros, o contoler pega esses erros e envia para o midlewere de erros no index
 throw new AppErrors('error: name is required',  400)
 }

 if (!email || validarEmail(email) == false) {
   throw new AppErrors('error: email is invalid ', 400)
 }

 if (!password || password.length < 6 || validPass(password) == false) {

   throw new AppErrors('password must be at least 6 characters long with letters and numbers', 400)

 }

     try {
      const doubleEmail = await userRepo.checkEmail(email)
       // o retorno da checkEmail é null ou user, aqui o if verifica se é trhuthy porem null e falsy, se voltar null
       // o if nao é acionado.
       if (doubleEmail) {

        throw new AppErrors('Email already registered', 409)
       }
       // este catch é para capturar erros desconhecidos o throw aqui permite que o express capture o erro
    } catch (err) {
      throw(err)
    }

  // criptografia da senha com o bcript
 const saltRounds = 10
 const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Criando um novo usuário - aqui utiliando um objeto do tipo da interface User para passar para o repp.
    const newUser:User = {
     id: uuidv4(),
     name,
     email,
     password: hashedPassword,
   }

    // Acionando o repository para salvar no banco
    await userRepo.create(newUser)
    return newUser
  }
}

export default userService

