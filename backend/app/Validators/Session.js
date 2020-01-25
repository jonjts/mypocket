'use strict'

class Session {

  get validateAll() {
    return true
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required|min:6',
    }
  }

  get messages() {
    return {
      'email.email': 'Informe um email valido',
      'email.required': 'Email obrigatório',
      'password.required': 'Senha obrigatória',
      'password.min': 'A senha precisa ter pelo menos 6 caracteres',
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

}

module.exports = Session
