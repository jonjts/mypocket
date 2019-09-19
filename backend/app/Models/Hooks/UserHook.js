'use strict'

const Hash = use('Hash')

const UserHook = exports = module.exports = {}

UserHook.hashPassword = async (user) => {
    user.password = await Hash.make(user.password)
}


UserHook.lowEmail = async (user) => {
    user.email = user.email.toLowerCase()
}