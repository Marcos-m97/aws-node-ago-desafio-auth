import conn from '../db.js'
import { User } from '../models/user.js'

// objeto que contem a logica do repository
class UserRepositorie {
  //aqui a func create tem como parametro o user, sera passado pelo service qunado esta funçao  for chamada la
  async create(user: User): Promise<any> {
    try {
      const qry: string =
        'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)'
      await conn.query(qry, [user.id, user.name, user.email, user.password])
    } catch (err) {
      throw new Error
    }
  }
  // funçao que interage com o DB e verifica se ja existe um usuario cadastrado
  async checkEmail(email: string): Promise<User| null> {
    try {
      const verifyEmail: string = 'SELECT * FROM users WHERE email = ?'
      /*é equivalente a fazer:
const data = await conn.query(qry, [name]);
let result = data[0]
    res.status(200).json(result);
  */
      const [rows, fields] = await conn.query<any>(verifyEmail, [email])
      if (rows.length > 0) {
        return rows[0]
      } else return null
    } catch (err) {
      throw err
    }
  }
}

export default UserRepositorie


// tem que arrumar este exeplo ele esta usando o patial o que nao precisa pois o meu id e opcional e ele naoesta usando a classe user e sim um objeto userdata q ele criou
/*
com sequelize:
import { User } from '../models/user'; // Importando o model do Sequelize

class UserRepository {
  // Método para criar um novo usuário

  public async create(userData: Partial<User>): Promise<User> {
    try {
      // Usamos o método `create` do Sequelize, que cria o registro no banco de dados
      const user = await User.create(userData);
      return user;
    } catch (err) {
      throw new Error('Erro ao criar usuário');
    }
  }

  // Método para verificar se o email já está cadastrado
  public async checkEmail(email: string): Promise<User | null> {
    try {
      // Usamos o `findOne` do Sequelize para encontrar um usuário pelo email
      const user = await User.findOne({ where: { email } });
      return user;
    } catch (err) {
      console.log(err);
      throw new Error('Erro ao verificar email');
    }
  }
}

export default UserRepository;


*/
