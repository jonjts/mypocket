import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import PasswordActions from "../ducks/passwords";

export function* update({ password_data }) {
  try {
    const response = yield call(api.put, `/password`, password_data);

    yield put(PasswordActions.updatePasswordSuccess(response.data));

  } catch (error) {
    console.log(error.response)
  }
}