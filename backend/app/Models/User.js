'use strict'

const BaseModel = use('MongooseModel')
const { ObjectId } = use('mongoose').Schema.Types

/**
 * @class User
 */
class User extends BaseModel {
  static boot({ schema }) {
    // Hooks:
    this.addHook('preSave', 'UserHook.hashPassword')
    this.addHook('preSave', 'UserHook.lowEmail')
  }
  /**
   * User schema
   */
  static get schema() {
    return {
      uid: { type: ObjectId },
      nome: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: {type: String, required: true},
      dataNascimento: { type: Date, required: true},
      avatar: { type: String, },
      loginSource: { type: String, },
      loginToken: { type: String,  },
    }
  }

}

module.exports = User.buildModel('User')
