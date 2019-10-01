export default class TipoSchema {
  static schema = {
    name: 'Tipo',
    primaryKey: '_id',
    properties: {
      _id: { type: 'string', indexed: true },
      nome: { type: 'string', optional: false },
      alias: { type: 'string', optional: false },
      active: { type: 'bool', optional: false, default: true },
    },
  };
}