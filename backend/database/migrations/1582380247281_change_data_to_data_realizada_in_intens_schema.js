'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ChangeDataToDataRealizadaInIntensSchema extends Schema {
  up() {
    this.withSchema('financial').table('itens', (table) => {
      table
        .renameColumn('data', 'realizado_em')
    })
  }

  down() {
    this.withSchema('financial').table('itens', (table) => {
      table.renameColumn('realizado_em', 'data')
    })
  }
}

module.exports = ChangeDataToDataRealizadaInIntensSchema
