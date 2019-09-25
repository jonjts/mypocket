import { all, spawn, takeEvery } from "redux-saga/effects";

import { UsersTypes } from "../ducks/users";
import { PasswordsTypes } from "../ducks/passwords";
import { update as updateUser } from "./users";
import { update as updatePassword } from "./passwords";


import { startWatchingNetworkConnectivity } from "./offline";

export default function* rootSaga() {
  yield all([
    spawn(startWatchingNetworkConnectivity),

    takeEvery(UsersTypes.UPDATE_USER, updateUser),
    takeEvery(PasswordsTypes.UPDATE_PASSWORD, updatePassword)
  ]);
}