'use strict'

const BaseModel = use('MongooseModel')
const { ObjectId } = use('mongoose').Schema.Types

/**
 * @class Categoria
 */
class Categoria extends BaseModel {
  /**
   * Exclude created_at and updated_at from the model
   */
  static get timestamps() {
    return false
  }
  static boot({ schema }) {
    // Hooks:
    // this.addHook('preSave', () => {})
    // this.addHook('preSave', 'CategoriaHook.method')
    // Indexes:
    // this.index({}, {background: true})
  }
  /**
   * Categoria's schema
   */
  static get schema() {
    return {
      uid: { type: ObjectId },
      nome: { type: String, required: true, unique: true },
      alias: { type: String , required: true, unique: true},
      icon: {type: String, }
    }
  }
}

module.exports = Categoria.buildModel('Categoria')
