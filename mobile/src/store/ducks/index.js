import { combineReducers } from 'redux';
import { reducer as offline } from "redux-offline-queue";
import { reducer as users } from "./users";
import { reducer as categorias } from "./categorias";
import { reducer as tipos } from './tipos'

const reducers = combineReducers({
  offline,
  users,
  categorias,
  tipos,
});

export default reducers;
