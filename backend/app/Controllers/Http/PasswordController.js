'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class PasswordController {

    async update({ auth, request, response }) {
        const data = request.only(["oldPassword", "password"])
        let user = await auth.getUser()
        user = await User.findById(user._id)

        await auth.attempt(user.email, data.oldPassword)

        user.password = data.password
        user.save()
        return user

    }
}

module.exports = PasswordController
