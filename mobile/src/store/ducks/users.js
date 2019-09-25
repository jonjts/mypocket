import { createReducer, createActions } from "reduxsauce";
import { markActionsOffline } from "redux-offline-queue";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  updateUser: ["user_data"],
  updateUserSuccess: ["user"]
});

markActionsOffline(Creators, ["updateUser"]);

export const UsersTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false
});

/* Reducers */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_USER]: state => state.merge({ loading: true }),
  [Types.UPDATE_USER_SUCCESS]: (state, { user }) => 
    state.update("data", data => [...data, user])
});