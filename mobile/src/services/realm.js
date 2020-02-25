import Realm from 'realm';

import UserSchema from '~/schemas/UserSchema';
import CategoriaSchema from '~/schemas/CategoriaSchema'
import ItemSchema from '~/schemas/ItemSchema'

export default function getRealm() {
  return Realm.open({
    schema: [UserSchema, CategoriaSchema, ItemSchema],
    schemaVersion: 3,
    migration: (oldRealm, newRealm) => {
      if (oldRealm.schemaVersion < 2) {
        const oldObjects = oldRealm.objects('Item');
        const newObjects = newRealm.objects('Item');

        // mudar o valores para os novos atributos do item
        for (let i = 0; i < oldObjects.length; i++) {
          newObjects[i].deleted_at = oldObjects[i].deletedAt
          newObjects[i].sent_at = oldObjects[i].sentAt
        }
      }
      if (oldRealm.schemaVersion < 3) {
        const oldObjects = oldRealm.objects('Item');
        const newObjects = newRealm.objects('Item');

        // mudar o valores para os novos atributos do item
        for (let i = 0; i < oldObjects.length; i++) {
          newObjects[i].updated_at = oldObjects[i].created_at
        }
      }
    }
  });
}