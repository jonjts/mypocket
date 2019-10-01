'use strict'

const Tipo = use('App/Models/Tipo')

class TipoController {

    async get(params) {
        return await Tipo.find()
    }
}

module.exports = TipoController
