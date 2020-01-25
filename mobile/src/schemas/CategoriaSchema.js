export default class CategoriaSchema {
  static schema = {
    name: 'Categoria',
    primaryKey: 'id',
    properties: {
      id: { type: 'string', indexed: true },
      nome: { type: 'string', optional: false },
      alias: { type: 'string', optional: false },
      icon: { type: 'string', optional: true },
      ativo: { type: 'bool', optional: false, default: true },
    },
  };
}