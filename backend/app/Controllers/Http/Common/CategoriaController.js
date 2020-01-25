'use strict'

const Categoria = use('App/Models/Common/Categoria')

class CategoriaController {

    async index({ auth }) {
        return await Categoria.all()
    }
}

module.exports = CategoriaController
