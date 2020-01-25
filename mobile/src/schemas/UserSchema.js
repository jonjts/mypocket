export default class UserSchema {
  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      nome: { type: 'string', optional: false },
      data_nascimento: 'date',
      email: 'string',
      avatar: { type: 'string', optional: true },
    
    },
  };
}