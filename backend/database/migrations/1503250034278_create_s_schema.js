'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateSSchema extends Schema {
  async up() {
    await this.raw(`CREATE SCHEMA IF NOT EXISTS security`)
    await this.raw(`CREATE SCHEMA IF NOT EXISTS common`)
    await this.raw(`CREATE SCHEMA IF NOT EXISTS financial`)
    await this.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
  }

  down() {

  }
}

module.exports = CreateSSchema
