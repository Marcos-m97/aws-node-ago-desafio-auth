import 'dotenv/config'
import { User } from '../models/user.js'
import bcrypt from 'bcrypt'
import conn from '../db.js'

// Função de seed para criar o usuário padrão
export async function createSeed(): Promise<User | undefined> {
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(
    process.env.DEFAULT_PASSWORD!,
    saltRounds
  )

  const seedUser = new User(
    process.env.DEFAULT_NAME!,
    process.env.DEFAULT_EMAIL!,
    hashedPassword!,
    process.env.DEFAULT_ID!
  )

  const verifyEmail: string = 'SELECT * FROM users WHERE email = ?'
  const [rows, fields] = await conn.query<any>(verifyEmail, [seedUser.email])
  if (rows.length > 0) {
    console.log('seed ja registrada, prossiga')
  } else {
    try {
      const qry: string =
        'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)'
      await conn.query(qry, [
        seedUser.id,
        seedUser.name,
        seedUser.email,
        seedUser.password
      ])
      return seedUser
    } catch (err) {
      throw err
    }
  }
}

export default createSeed
