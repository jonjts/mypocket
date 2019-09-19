import Realm from 'realm';

import UserSchema from '../schemas/UserSchema';

export default function getRealm() {
  return Realm.open({
    schema: [UserSchema],
  });
}