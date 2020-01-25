export default class ItemSchema {
  static schema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      user: { type: 'User', required: true },
      descricao: { type: 'string', required: true },
      data: { type: 'date', required: true },
      valor: { type: 'double', required: true },
      tipo: { type: 'string', required: true },
      categoria: { type: 'Categoria', required: true },
      deletedAt: { type: 'date?', required: false },
      sentAt: { type: 'date?', required: false }
    },
  };
}