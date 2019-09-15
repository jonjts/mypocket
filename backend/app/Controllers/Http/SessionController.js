'use strict'

const User = use('App/Models/User')

class SessionController {

    async store({ request, auth }) {
        const data = request.only(["email", "password"])

        const token = await auth.attempt(data.email, data.password)
        const user = await User.findBy("email", data.email)

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
