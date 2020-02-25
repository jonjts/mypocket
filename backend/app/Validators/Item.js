'use strict'

const { rule } = require('indicative')

class Item {

  get validateAll() {
    return true
  }

  get rules() {
    return {
      valor: [rule('required'),],
      descricao: [rule('required')],
      realizado_em: [rule('required')],
      tipo: [
        rule('required'),
        rule('in', ['R', 'D'])
      ],
      categoria_id: [rule('required')],
    }
  }

  get messages() {
    return {
      "valor.required": "Informe o valor",
      "descricao.required": "Informe uma descrição",
      "realizado_em.required": "Informe a data",
      "tipo.required": "Informe o tipo",
      "tipo.in": "Tipo deve ser despesa ou receita",
      "categoria_id.required": "Selecione uma categoria",
    }
  }

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages)
  }

}

module.exports = Item
