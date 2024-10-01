import conn from '../db.js'

// interface para definir os tipos das entradas
interface User {
  id?: string
  name: string
  email: string
  password: string
}

// objeto que contem a logica do repository
const userRepo = {
  //aqui a func create tem como parametro o user, sera passado pelo service qunado esta funçao  for chamada la
  async create(user: User): Promise<any> {
    try {
      const qry: string =
        'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)'
      await conn.query(qry, [user.id, user.name, user.email, user.password])
    } catch (err) {
      throw new Error('Erro ao criar usuaro')
    }
  },

  // funçao que interage com o DB e verifica se ja existe um usuario cadastrado
  async checkEmail(email: string): Promise<User | null> {

    try {
      const verifyEmail: string = 'SELECT * FROM users WHERE email = ?'
      const [data] = await conn.query<any>(verifyEmail, [email])
      if (data.length > 0) {
        return data
      } else return null

    } catch (err) {
      console.log(err)
      throw new Error('Erro ao verificar email')
    }
  }
}

export default userRepo
