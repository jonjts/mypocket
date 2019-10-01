'use strict'

const BaseModel = use('MongooseModel')
const { ObjectId } = use('mongoose').Schema.Types

/**
 * @class Tipo
 */
class Tipo extends BaseModel {
  /**
   * Exclude created_at and updated_at from the model
   */
  static get timestamps() {
    return false
  }
  /**
   * Tipo's schema
   */
  static get schema() {
    return {
      uid: { type: ObjectId },
      nome: { type: String, required: true, unique: true },
      alias: { type: String, required: true, unique: true },
      active: { type: Boolean, required: true, default: true },
      icon: { type: String, }
    }
  }
}

module.exports = Tipo.buildModel('Tipo')
