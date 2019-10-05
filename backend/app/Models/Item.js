'use strict'

const BaseModel = use('MongooseModel')
const { ObjectId, Decimal128 } = use('mongoose').Schema.Types
/**
 * @class Item
 */
class Item extends BaseModel {

  static get schemaOptions() { return { collection: "itens", }; }

  /**
   * Item's schema
   */
  static get schema() {
    return {
      uid: { type: ObjectId },
      user: { type: ObjectId, ref: 'User', required: true },
      descricao: { type: String, required: true },
      data: { type: Date, required: true, },
      valor: { type: Decimal128, required: true, default: 0.0 },
      tipo: { type: ObjectId, ref: 'Tipo', required: true },
      categoria: { type: ObjectId, ref: 'Categoria' },
      deletedAt: { type: Date, required: false },
      sentAt: { type: Date, required: true, default: Date.now() }
    }
  }
}

module.exports = Item.buildModel('Item')
