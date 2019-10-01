import { call, put } from "redux-saga/effects";
import utils from '~/utils'
import api from "../../services/api";
import getRealm from '~/services/realm';

import CategoriasActions from "~/store/ducks/categorias";

export function* update() {
  try {
    const response = yield call(api.get, `/categorias`);
    const categorias = response.data
    yield utils.saveCategorias(categorias)

    yield put(CategoriasActions.updateCategoriasSuccess(categorias));

  } catch (error) {
    console.log(error)
  }
}

export function* load() {
  try {
    const realm = yield getRealm();
    let categorias = []
    realm.write(() => {
      categorias = realm.objects('Categoria').filtered('active == true');
    })
    yield put(CategoriasActions.loadCategoriasSuccess(Array.from(categorias)));

  } catch (error) {
    console.log(error)
  }
}