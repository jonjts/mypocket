import { call, put } from "redux-saga/effects";
import utils from '~/utils'
import api from "../../services/api";
import getRealm from '~/services/realm';

import ItensActions from "~/store/ducks/itens";

export function* saveLocal({ item_data, isNew = true }) {
  try {
    const realm = yield getRealm();
    yield realm.write(() => {
      realm.create('Item', item_data, true)
    });
    yield put(ItensActions.saveLocalItemSuccess(item_data, isNew))
  } catch (error) {
    console.log(error)
    yield put(ItensActions.saveLocalItemFail(error, isNew))
  }
}

export function* saveCloud({ item_data, isNew = true }) {
  try {
    const credentials = utils.credentials();
    if (isNew) {
      const response = yield call(api.pots, `/users/${credentials.user_id}/itens`, item_data);
    } else {
      const response = yield call(api.put, `/users/${credentials.user_id}/itens/${item_data.id}`, item_data);
    }
    yield put(ItensActions.saveCloudItemSuccess(item_data, isNew))
  } catch (error) {
    console.log(error)
    yield put(ItensActions.saveCloudItemFail(error, isNew))
  }
}