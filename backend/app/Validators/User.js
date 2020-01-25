'use strict'

const { rule } = require('indicative')

class User {

  get rules() {
    const userId = this.ctx.params.id
    const checkOwnEmail = userId ? `,${userId}` : "";
    return {
      data_nascimento: [
        rule("required"),
        rule('date'),
        rule('dateFormat', 'YYYY-MM-DD'),
      ],
      email: `required|email|unique:security.users,email${checkOwnEmail}`,
      password: 'required|min:6',
      nome: 'required',
    }
  }

  get messages(){
    return {
      "email.require": "Informe um email",
      "email.email": "Email invalido",
      "email.unique": "Este email já está em uso",
      "password.required": "Você precisa informar sua senha",
      "password.min": "Sua senha precisa de pelo menos dígitos",
      "data_nascimento.date": "Informe uma data de nascimento válida",
      "data_nascimento.required": "Informe sua data de nascimento",
      "data_nascimento.dateFormat": "Informe uma data de nascimento válida"
    }
  }

  async fails (errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

}

module.exports = User
