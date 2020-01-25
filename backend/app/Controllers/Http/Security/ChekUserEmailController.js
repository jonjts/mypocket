'use strict'

const User = use('App/Models/Security/User')

class ChekUserEmailController {

    async show({ params, response }) {
        const { email } = params
        const user = await User.findBy({ 'email': email })
        if (user) {
            return response.status(400).send('Esse email já está em uso')
        } else {
            return response.send({
                message: 'Email válido'
            })
        }
    }

}

module.exports = ChekUserEmailController
