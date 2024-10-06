import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken' // Import usando ESM e Tipos do JWT

// Extendendo a interface Request para incluir o campo "user"
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload // "user" pode ser uma string (id) ou o payload do token
}

const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Pega o token após "Bearer"

  if (!token) {
    return res.status(403).json({ error: 'invalid token' })
  }

  try {
    // Verificando o token de forma assíncrona
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded // Armazena o payload decodificado no campo "user"
    next() // Prossegue para o próximo middleware
  } catch (err) {
     res.status(403).json({ error: 'invalid token' })
  }
}

export default authenticateToken
