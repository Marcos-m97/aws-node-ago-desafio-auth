import conn from '../db.js'

interface User {
  id?: string
  name: string
  email: string
  password: string
}

const userRepo = {

  //aqui a func create tem como parametro o user, sera passado pelo service qunado esta funçao  for chamada la 
  async create(user: User): Promise<any> {
    const qry: string =
      'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)'
    await conn.query(qry, [
      user.id,
      user.name,
      user.email,
      user.password
    ])
  },

  async checkEmail(email: string): Promise<User | null> {
    const verifyEmail: string = 'SELECT * FROM users WHERE email = ?'
    const [data] = await conn.query<any>(verifyEmail, [email])
    if (data.length > 0) {
      return data
    } else return null
  }
}

export default userRepo
