export default class UserSchema {
    static schema = {
      name: 'User',
      primaryKey: '_id',
      properties: {
        _id: { type: 'string', indexed: true },
        nome: 'string',
        dataNascimento: 'date',
        email: 'string',
        created_at: 'date',
        updated_at: 'date',
      },
    };
  }