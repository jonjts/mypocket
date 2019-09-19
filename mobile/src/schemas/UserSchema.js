export default class UserSchema {
  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: { type: 'string', indexed: true },
      nome: 'string',
      dataNascimento: 'date',
      email: 'string',
      avatar: { type: 'string', optional: true},
      loginSource: { type: 'string', optional: true },
      loginToken: { type: 'string', optional: true },
      created_at: 'date',
      updated_at: 'date',
    },
  };
}