'use strict'

const User = use('App/Models/Security/User')

class ItemController {

    async index({ auth }) {
        const user = await auth.getUser()
        return user.itens().fetch()
    }

    async store({ auth, request }) {
        const data = request.only([
            "id",
            "user_id",
            "categoria_id",
            "descricao",
            "data",
            "valor",
            "tipo",])

        const user = await auth.getUser()
        const item = await user.itens().create(data)

        return item
    }
}

module.exports = ItemController
