'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateItemSchema extends Schema {
  up() {
    this.withSchema('financial').create('itens', (table) => {
      table.uuid('id')
        .primary()
        .defaultTo(this.db.raw('uuid_generate_v4()'))
      table
        .uuid('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('security.users')
      table
        .uuid('categoria_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('common.categorias')
      table
        .text('descricao')
        .notNullable()
      table
        .date('data')
        .notNullable()
        .comment('data em que a receita/despesa foi/será realizada')
      table
        .decimal('valor', 12, 2)
        .notNullable()
      table
        .string('tipo', 1)
        .notNullable()
      table
        .timestamp('removido_em')
      table
        .timestamp('recebido_em')
        .notNullable()
        .defaultTo(this.fn.now())
      table.timestamps()
    })
  }

  down() {
    this.withSchema('financial').drop('itens')
  }
}

module.exports = CreateItemSchema
