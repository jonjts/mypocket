'use strict'

const Categoria = use('App/Models/Categoria')

class CategoriaController {

    async get({ auth }) {
        return await Categoria.find()
    }
}

module.exports = CategoriaController
