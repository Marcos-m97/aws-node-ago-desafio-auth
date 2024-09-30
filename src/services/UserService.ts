import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import userRepo from '../repositories/userRepositories.js'


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

interface User {
  id?: string
  name: string
  email: string
  password: string
}

 const userService = {

  async createUser({name, email, password }:User):Promise<any|User> {

 if (!name) {
 throw new Error('name is required')
 }

 if (!email || validarEmail(email) == false) {
   throw new Error('error: email is invalid ')
 }

 if (!password || password.length < 6 || validPass(password) == false) {

   throw new Error('password must be at least 6 characters long with letters and numbers')

 }

    try {
      const doubleEmail = await userRepo.checkEmail(email)
      if (doubleEmail) {
        //verficar como vai ficar o retorno do json
        throw new Error('Email already registered')
      }
    } catch (err) {
      console.log(err)
    }

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

