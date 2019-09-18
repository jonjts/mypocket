'use strict'

const User = use('App/Models/User')

class ChekUserEmailController {

    async show({ params, response }) {
        const { email } = params
        const user = await User.findBy('email', email)
        if (user) {
            return response.status(500).send('Esse email já está em uso')
        } else {
            return response.send('Email válido')
        }
    }

}

module.exports = ChekUserEmailController
