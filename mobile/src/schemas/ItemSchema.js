export default class ItemSchema {
    static schema = {
      name: 'Item',
      primaryKey: '_id',
      properties: {
        _id: { type: 'string', indexed: true },
        user: { type: 'User', required: true},
        descricao: { type: 'string', required: true},
        data: { type: 'date', required: true},
        valor: {type: 'double', required: true},
        tipo: { type: 'Tipo', required: true},
        categoria: {type: 'Categoria', required: true},
        deletedAt: 'date',
        sentAt: 'date'
      },
    };
  }