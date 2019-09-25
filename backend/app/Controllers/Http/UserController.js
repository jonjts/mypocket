'use strict'

const User = use('App/Models/User')

class UserController {

    async store({ request, auth }) {
        const data = request.only(["nome", "email", "password", "dataNascimento"])

        const user = await User.create(data)
        const token = await auth.attempt(data.email, data.password)

        return {
            "auth": token,
            "user": user
        }
    }

    async update({ request, auth, response, params }) {
        const data = request.only(["nome", "dataNascimento"])
        const id = params.id

        let user = await User.findOne({ "_id": id })
        const userLoged = await auth.getUser()
        if (!user || userLoged._id != id) {
            return response.status(406).send('Acesso negado')
        }

        user.nome = data.nome
        user.dataNascimento = data.dataNascimento

        await user.save()
        return user
    }
}

module.exports = UserController
