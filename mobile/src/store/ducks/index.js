import { combineReducers } from 'redux';
import { reducer as offline } from "redux-offline-queue";
import { reducer as users } from "./users";

const reducers = combineReducers({
  offline,
  users,
});

export default reducers;
