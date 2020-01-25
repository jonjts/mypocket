'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Categoria = use('App/Models/Common/Categoria')

class CreateCategoriasSchema extends Schema {
  async up() {
    this.withSchema('common').create('categorias', (table) => {
      table.uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'))
      table.string('nome', 200)
        .notNullable()
      table.string('alias', 200)
        .notNullable()
        .unique()
      table.boolean('ativo')
        .notNullable()
        .defaultTo(true)
      table.string('icon', 100)
      table.timestamps()
    })
  }

  down() {
    this.withSchema('common').drop('categorias')
  }
}

module.exports = CreateCategoriasSchema
