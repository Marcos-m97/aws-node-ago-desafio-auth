import AppErrors from './errors.js'

//regex de validaçao do email
export function validarEmail(e_mail: string): boolean {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regexEmail.test(e_mail)
}

// eu poderia atribuir o retorno a uma variavel e no codigo criar um outra variave para receber o valor
// e assim ao inves de colocar validPass(password) == false eu colocaria variaveç == false
export function validPass(senha: string): boolean {
  const regexPassword = /^(?=.*[a-zA-Z])(?=.*\d)/
  return regexPassword.test(senha)
}

export function validUser(
  userName: string,
  userEmail: string,
  userPassword: string,
  confirmPassWord: string
): void {
  if (!userName) {
    // o controler cria novas instancias dos erros, o contoler pega esses erros e envia para o midlewere de erros no index
    throw new AppErrors('error: name is required', 400)
  }

  if (!userEmail || validarEmail(userEmail) == false) {
    throw new AppErrors('error: email is invalid ', 400)
  }

  if (
    !userPassword ||
    userPassword.length < 6 ||
    validPass(userPassword) == false
  ) {
    throw new AppErrors(
      'password must be at least 6 characters long with letters and numbers',
      400
    )
  }

  if (!confirmPassWord || confirmPassWord != userPassword) {
    throw new AppErrors('password dont mach confirmation', 400)
  }
}
