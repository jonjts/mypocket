import { call, put } from "redux-saga/effects";
import utils from '~/utils'
import api from "../../services/api";

import CategoriasActions from "~/store/ducks/categorias";

export function* update() {
  try {
    const response = yield call(api.get, `/categorias`);
    const categorias = response.data
    utils.saveCategorias(categorias)
    
    yield put(CategoriasActions.updateCategoriasSuccess(categorias));

  } catch (error) {
    console.log(error.response)
  }
}