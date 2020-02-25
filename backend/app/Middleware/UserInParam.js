'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class UserInParam {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, auth, params }, next) {
    let user = await auth.getUser()
    const userId = params.user_id || params.id

    if (user.id != userId) {
      let err = new Error('Você não tem permissão')
      err.statusCode = 401;
      throw err;
    }

    await next()
  }
}

module.exports = UserInParam
