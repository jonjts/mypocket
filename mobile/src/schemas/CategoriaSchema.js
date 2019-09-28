export default class UserSchema {
  static schema = {
    name: 'Categoria',
    primaryKey: '_id',
    properties: {
      _id: { type: 'string', indexed: true },
      nome: { type: 'string', optional: false },
      alias: { type: 'string', optional: false },
      icon: { type: 'string' }
    },
  };
}