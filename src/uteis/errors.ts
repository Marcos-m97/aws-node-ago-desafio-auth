class AppErrors {
 public message: string
 public code: number

  constructor(message: string, code: number) {
    this.message = message,
    this.code = code
  }
}
export default AppErrors
