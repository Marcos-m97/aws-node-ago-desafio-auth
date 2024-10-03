import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

// importo a clase appErrors para criar novos erro aqui
import AppErrors from '../uteis/errors.js'

// aqui importo a interface UserIput do repositorie para nao ter que reescreve-la e  a classe User para instanciala aqui
import userRepositorie from '../repositories/userRepositories.js'
// aqui tambem utilizo a interface para tipar os dados da funçao createUser com as regras de negocio
import { User } from '../models/user.js'

// importo as funçoes de validaçao mais simples (as que nao dependem de interaçao com o Db da pasta uteis)
import { validUser } from '../uteis/validFunctions.js'

// objeto que contem a logica dos serrvices
class UserService {

  private userRepo: userRepositorie;

  constructor(userRepo: userRepositorie) {
    this.userRepo = userRepo;
  }

  // a funçao é assync e recebe como parametro um objeto do tipo usser, esse objeto vem do contoler
  // a funçao retorna uma promise que pode ser do tipo user,se retornar algo, ou any se rornar erros
  // validUser  é um método da classe User criada no model e  cuida das validaçoes mais simples e tem as regez do email e senha e lança os new errors com exeçao
  // do double email que faz uma consulta ao banco.
  public async createUser({name,email,password}: User): Promise<any | User> {

    // verifica as validaçoes que contem a instancia dos erros personalizdos capturados pelo midlewere de erros
    validUser(name, email, password)

    // doubleEmail guarda o retorno da checkemail
    try {
      const doubleEmail = await this.userRepo.checkEmail(email)
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
      await this.userRepo.create(newUser)
      return newUser
    } catch (err) {
      throw err
    }
  }
}

export default UserService


/*
import { User } from '../models/User';
import UserRepository from '../repositories/UserRepository';

class UserService {
  private userRepo: UserRepository;

  constructor(userRepo: UserRepository) {
    this.userRepo = userRepo;
  }

  // Método para criar um usuário usando o model `User` como tipo
  public async createUser(userData: User): Promise<User> {
    const { name, email, password } = userData;

    // Verificar se o email já está registrado
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    // Criar o novo usuário no banco de dados
    return await this.userRepo.create(userData);
  }
}

export default UserService;

*/
