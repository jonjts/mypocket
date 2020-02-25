import { all, spawn, takeEvery } from "redux-saga/effects";

import { UsersTypes } from "../ducks/users";
import { PasswordsTypes } from "../ducks/passwords";
import { CategoriasTypes } from '../ducks/categorias'
import { ItensTypes } from '../ducks/itens'
import { update as updateUser } from "./users";
import { update as updatePassword } from "./passwords";
import { update as updateCategorias } from './categorias'
import { load as loadCategorias } from './categorias'
import { saveLocal as saveLocalItem } from './itens'
import { saveCloud as saveCloudItem } from './itens'
import { findAll } from './itens'
import { deleteCloud } from './itens'

import { startWatchingNetworkConnectivity } from "./offline";

export default function* rootSaga() {
  yield all([
    spawn(startWatchingNetworkConnectivity),

    takeEvery(UsersTypes.UPDATE_USER, updateUser),
    takeEvery(PasswordsTypes.UPDATE_PASSWORD, updatePassword),
    takeEvery(CategoriasTypes.UPDATE_CATEGORIAS, updateCategorias),
    takeEvery(CategoriasTypes.LOAD_CATEGORIAS, loadCategorias),
    takeEvery(ItensTypes.SAVE_LOCAL_ITEM, saveLocalItem),
    takeEvery(ItensTypes.SAVE_CLOUD_ITEM, saveCloudItem),
    takeEvery(ItensTypes.FIND_ALL, findAll),
    takeEvery(ItensTypes.DELETE_CLOUD_ITEM, deleteCloud),
  ]);
}