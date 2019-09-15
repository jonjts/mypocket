'use strict'

class Session {
  get rules() {
    return {
      "email": "required|email",
      "password": "min:6|required"
    }
  }

  get messages() {
    return {
      "email.require": "Informe um email",
      "email.email": "Email invalido",
      "password.required": "Você precisa informar sua senha",
      "password.min": "Sua senha precisa de pelo menos dígitos",
    }
  }
  
  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages)
  }
}

module.exports = Session
