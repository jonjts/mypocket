'use strict'

const User = use('App/Models/User')

class SessionController {

    async store({ request, auth, response }) {
        const data = request.only(["email", "password"])

        const token = await auth.attempt(data.email.toLowerCase(), data.password)
        const user = await User.findBy("email", data.email.toLowerCase())

        if(!user){
            return response.status(406).send('Usuário ou senha inválido(s)')
        }

        return {
            auth: token,
            user: user
        }
    }

    async delete({ auth, response }){
        await auth.logout()

        return response.send('Até mais')
    }
}

module.exports = SessionController
