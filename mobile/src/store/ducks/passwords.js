import { createReducer, createActions } from "reduxsauce";
import { markActionsOffline } from "redux-offline-queue";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  updatePassword: ["password_data"],
  updatePasswordSuccess: ["password"]
});

markActionsOffline(Creators, ["updatePassword"]);

export const PasswordsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false
});

/* Reducers */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_PASSWORD]: state => state.merge({ loading: true }),
  [Types.UPDATE_PASSWORD_SUCCESS]: (state, { user }) => 
    state.update("data", data => [...data, user])
});