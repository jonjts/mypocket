import { combineReducers } from 'redux';
import { reducer as offline } from "redux-offline-queue";
import { reducer as users } from "./users";
import { reducer as categorias } from "./categorias";
import { reducer as itens } from './itens';

const reducers = combineReducers({
  offline,
  users,
  categorias,
  itens,
});

export default reducers;
