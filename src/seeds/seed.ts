import bcrypt from 'bcrypt'
import 'dotenv/config' // Para carregar as variáveis do .env

// Função de seed para criar o usuário padrão
const seedUser = async (): Promise<void> => {
  try {
    // Verifica se o usuário com o email padrão já existe
    const existingUser = await User.findOne({
      email: process.env.DEFAULT_EMAIL
    })

    if (!existingUser) {
      // Se o usuário não existir, cria um novo usuário com a senha criptografada
      const hashedPassword = await bcrypt.hash(
        process.env.DEFAULT_PASSWORD as string,
        10
      )

      const user = new User({
        email: process.env.DEFAULT_EMAIL,
        password: hashedPassword
      })

      await user.save()
      console.log('Usuário padrão criado')
    } else {
      console.log('Usuário padrão já existe')
    }
  } catch (error) {
    console.error('Erro ao criar seed de usuário:', error)
  }
}

export default seedUser
