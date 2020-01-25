'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.withSchema('security').create('users', (table) => {
      table.uuid('id').primary().defaultTo(this.db.raw('uuid_generate_v4()'))
      table.string('nome', 254).notNullable()
      table.string('email', 254).notNullable()
      table.string('password', 60).notNullable()
      table.date('data_nascimento').notNullable()
      table.string('avatar')
      table.timestamps()
    })
  }

  down () {
    this.withSchema('security').drop('users')
  }
}

module.exports = UserSchema
