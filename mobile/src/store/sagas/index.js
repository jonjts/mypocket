import { all, spawn, takeEvery } from "redux-saga/effects";

import { UsersTypes } from "../ducks/users";
import { update } from "./users";

import { startWatchingNetworkConnectivity } from "./offline";

export default function* rootSaga() {
  yield all([
    spawn(startWatchingNetworkConnectivity),

    takeEvery(UsersTypes.UPDATE_USER, update)
  ]);
}