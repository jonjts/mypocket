'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeRemovidoEmToDeletedAtInIntensSchema extends Schema {
  up() {
    this.withSchema('financial').table('itens', (table) => {
      table.renameColumn('removido_em', 'deleted_at')
    })
  }

  down() {
    this.withSchema('financial').table('itens', (table) => {
      table.renameColumn('deleted_at', 'removido_em')
    })
  }
}

module.exports = ChangeRemovidoEmToDeletedAtInIntensSchema
