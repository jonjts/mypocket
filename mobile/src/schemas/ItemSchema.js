export default class ItemSchema {
  static schema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      user: { type: 'User', required: true },
      descricao: { type: 'string', required: true },
      realizado_em: { type: 'date', required: true },
      valor: { type: 'double', required: true },
      tipo: { type: 'string', required: true },
      categoria: { type: 'Categoria', required: true },
      deleted_at: { type: 'date?', required: false },
      updated_at: { type: 'date?', required: false, default: new Date() },
      deleted_at: { type: 'date?', required: false },
      sent_at: { type: 'date?', required: false }
    },
  };
}