'use strict'

const { rule } = require('indicative')

class Item {
  get rules() {
    return {
      valor: [rule('required'),],
      descricao: [rule('required')],
      data: [rule('required')],
      tipo: [rule('required')],
      categoria: [rule('required')],
    }
  }

  get messages(){
    return {
      "valor.required": "Informe o valor",
      "descricao.required": "Informe uma descrição",
      "data.required": "Informe a data",
      "tipo.required": "Informe o tipo",
      "categoria.required": "Selecione uma categoria",
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(500).send(errorMessages)
  }

}

module.exports = Item
