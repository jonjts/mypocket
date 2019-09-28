import { combineReducers } from 'redux';
import { reducer as offline } from "redux-offline-queue";
import { reducer as users } from "./users";
import { reducer as categorias } from "./categorias";

const reducers = combineReducers({
  offline,
  users,
  categorias,
});

export default reducers;
