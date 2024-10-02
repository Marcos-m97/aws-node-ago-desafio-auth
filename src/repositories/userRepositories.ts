import conn from '../db.js'
import { userType } from '../models/user.js'

// objeto que contem a logica do repository
const userRepo = {
  //aqui a func create tem como parametro o user, sera passado pelo service qunado esta funçao  for chamada la
  async create(user: userType): Promise<any> {
    try {
      const qry: string =
        'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)'
      await conn.query(qry, [user.id, user.name, user.email, user.password])
    } catch (err) {
      throw new Error('Erro ao criar usuario')
    }
  },

  // funçao que interage com o DB e verifica se ja existe um usuario cadastrado
  async checkEmail(email: string): Promise<userType| null> {
    try {
      const verifyEmail: string = 'SELECT * FROM users WHERE email = ?'
      //  aqui o destructuring tem um item pois assim guarda apenas um dos dois itens que sao rtornados pelo conn.quey
      /* o retorno do conn.query é um array [INFOSimportante,outros] desta forama, utilizando o destructuring
  apenas com um elemente estou pegando apenas o primeiro elemento do array que sao as infos que eu preciso
é equivalente a fazer:
const data = await conn.query(qry, [name]);
let result = data[0]

    res.status(200).json(result);
  */
      const [rows, fields] = await conn.query<any>(verifyEmail, [email])
      if (rows.length > 0) {
        return rows[0]
      } else return null
    } catch (err) {
      console.log(err)
      throw new Error('Erro ao verificar email')
    }
  }
}

export default userRepo
