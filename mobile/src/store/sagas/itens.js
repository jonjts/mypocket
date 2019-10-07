import { call, put } from "redux-saga/effects";
import utils from '~/utils'
import api from "../../services/api";
import getRealm from '~/services/realm';

import ItensActions from "~/store/ducks/itens";

export function* saveLocal({ item, isNew = true }) {
  try {
    if (isNew) {

    } else {

    }
    yield put(ItensActions.saveLocalItemSuccess(item))
  } catch (error) {
    console.log(error)
    yield put(ItensActions.saveLocalItemFail(error))
  }
}

export function* saveCloud({ item, isNew = true }) {
  try {
    if (isNew) {

    } else {

    }
    yield put(ItensActions.saveCloudItemSuccess(item))
  } catch (error) {
    console.log(error)
    yield put(ItensActions.saveCloudItemFail(error))
  }
}