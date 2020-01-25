import { createReducer, createActions } from "reduxsauce";
import { markActionsOffline } from "redux-offline-queue";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  saveLocalItem: ["item_data", "isNew"],
  saveLocalItemSuccess: ["item_data", "isNew"],
  saveLocalItemFail: ["message", "isNew"],
  saveCloudItem: ["item_data", "isNew"],
  saveCloudItemSuccess: ["item_data", "isNew"],
  saveCloudItemFail: ["message", "isNew"]
});

markActionsOffline(Creators, ["saveCloudItem"]);

export const ItensTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false
});

/* Reducers */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SAVE_LOCAL_ITEM]: state => state.merge({ loading: true }),
  [Types.SAVE_LOCAL_ITEM_SUCCESS]: (state, { item_data, isNew }) => (
    {item_data, isNew}
  ),
  [Types.SAVE_LOCAL_ITEM_FAIL]: (state, { message, isNew }) => (
    state.update("data", data => [...data, message, isNew])
  ),
  [Types.SAVE_CLOUD_ITEM]: state => state.merge({ loading: true }),
  [Types.SAVE_CLOUD_ITEM_SUCCESS]: (state, { item_data, isNew }) =>
    state.update("data", data => [...data, item_data, isNew]),
  [Types.SAVE_CLOUD_ITEM_FAIL]: (state, { message, isNew }) =>
    state.update("data", data => [...data, message, isNew]),
});