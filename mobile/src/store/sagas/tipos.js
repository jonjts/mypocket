import { call, put } from "redux-saga/effects";
import utils from '~/utils'
import api from "../../services/api";
import getRealm from '~/services/realm';

import TiposActions from "~/store/ducks/tipos";

export function* update() {
  try {
    const response = yield call(api.get, `/tipos`);
    const tipos = response.data
    yield utils.saveTipos(tipos)

    yield put(TiposActions.updateTiposSuccess(tipos));

  } catch (error) {
    console.log(error)
  }
}

export function* load() {
  try {
    const realm = yield getRealm();
    let tipos = []
    realm.write(() => {
      tipos = realm.objects('Tipo').filtered('active == true');
    })
    yield put(TiposActions.loadTiposSuccess(Array.from(tipos)));

  } catch (error) {
    console.log(error)
  }
}