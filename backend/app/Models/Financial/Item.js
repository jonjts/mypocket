'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Item extends Model {

    static get table() {
        return 'financial.itens'
    }

    user() {
        return this.belongsTo('App/Models/Security/User')
    }
}

module.exports = Item
