import Realm from 'realm';

import UserSchema from '~/schemas/UserSchema';
import CategoriaSchema from '~/schemas/CategoriaSchema'
import ItemSchema from '~/schemas/ItemSchema'

export default function getRealm() {
  return Realm.open({
    schema: [UserSchema, CategoriaSchema, ItemSchema],
  });
}