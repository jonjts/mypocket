'use strict'

const User = use('App/Models/Security/User')

class SessionController {

    async store({ auth, request }) {
        const data = request.only(["email", "password"])

        const token = await auth.attempt(data.email.toLowerCase(), data.password)
        const user = await User.findBy({ email: data.email })

        return {
            auth: token,
            user
        }

    }
    
}

module.exports = SessionController
