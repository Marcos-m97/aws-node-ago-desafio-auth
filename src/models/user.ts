import AppErrors from '../uteis/errors.js'

// interface para definir os tipos das entradas
export interface userType {
  name: string
  email: string
  password: string
  id?: string
}

export class User implements userType {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public id?: string
  ) {}

  //regex de validaçao do email
  public static validarEmail(e_mail: string): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regexEmail.test(e_mail)
  }

  // eu poderia atribuir o retorno a uma variavel e no codigo criar um outra variave para receber o valor
  // e assim ao inves de colocar validPass(password) == false eu colocaria variaveç == false
  public static validPass(senha: string): boolean {
    const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)/
    return regexPassword.test(senha)
  }

  public static validUser(
    userName: string,
    userEmail: string,
    userPassword: string
  ): void {
    if (!userName) {
      // o controler cria novas instancias dos erros, o contoler pega esses erros e envia para o midlewere de erros no index
      throw new AppErrors('error: name is required', 400)
    }
    // preciso usar o this aqui para usar o método dentro da classe
    if (!userEmail || this.validarEmail(userEmail) == false) {
      throw new AppErrors('error: email is invalid ', 400)
    }

    if (
      !userPassword ||
      userPassword.length < 6 ||
      this.validPass(userPassword) == false
    ) {
      throw new AppErrors(
        'password must be at least 6 characters long with letters and numbers',
        400
      )
    }
  }
}
