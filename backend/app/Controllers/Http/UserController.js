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
}

module.exports = UserController
