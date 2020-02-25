import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import UsersActions from "../ducks/users";

export function* update({ user_data }) {
  try {
    const response = yield call(api.put, `/users/${user_data._id}`, user_data);

    yield put(UsersActions.updateUserSuccess(response.data));

  } catch (error) {
    console.warn(error.response)
  }
}