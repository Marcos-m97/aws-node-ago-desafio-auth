import  { Request, Response, NextFunction } from "express";
import AppErrors from "../uteis/errors.js";


 let errorMiddlewere = function(error: Error, req: Request, res: Response, next: NextFunction) {
  // verifico se error é uma instancia de classe errors, criado no arquivo uteis
  // as instancias da classe apperrors sao incializadas no service atrave dos throws new
  if (error instanceof AppErrors) {
    //se for ela tem acesso as propriedades que eu defini na classe code e message.
    res.status(error.code).json({ error: error.message })
    return
  } else {
    res.status(500).json({ error: 'internal server error' })
  }
}

export default errorMiddlewere
