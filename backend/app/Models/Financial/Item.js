'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {

    static get table() {
        return 'financial.itens'
    }

    //Retornado dates vazio para formatar created_at e updated_at com timezone
    static get dates () {
        return []
      }

    user() {
        return this.belongsTo('App/Models/Security/User')
    }

    categoria() {
        return this.belongsTo('App/Models/Common/Categoria')
    }
}

module.exports = Item
