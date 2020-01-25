'use strict'

const User = use('App/Models/Security/User')

class UserController {

    async store({ request, auth }) {
        const data = request.only(["nome", "email", "password", "data_nascimento"])

        const user = await User.create(data)
        const token = await auth.attempt(data.email, data.password)

        return {
            "auth": token,
            "user": await User.findBy({ email: data.email })
        }
    }

    async update({ request, auth, response, params }) {
        const data = request.only(["nome", "data_nascimento"])
        const { id } = params

        let user = await User.find(id)
        const userLoged = await auth.getUser()
        if (!user || userLoged.id != id) {
            return response.status(406).send('Acesso negado')
        }

        user.nome = data.nome
        user.data_nascimento = data.data_nascimento
        await user.save()

        return user
    }
}

module.exports = UserController
