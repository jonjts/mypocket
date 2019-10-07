import { createReducer, createActions } from "reduxsauce";
import { markActionsOffline } from "redux-offline-queue";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  storeLocalItem: ["item", "isNew"],
  storeocalItemSuccess: ["item", "isNew"],
  storeLocalItemFail: ["message", "isNew"],
  saveCloudItem: ["item", "isNew"],
  saveCloudItemSuccess: ["item", "isNew"],
  saveCloudItemFail: ["message", "isNew"]
});

markActionsOffline(Creators, ["saveCouldItem"]);

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
  [Types.SAVE_LOCAL_ITEM_SUCCESS]: (state, { item, isNew }) => (
    state.update("data", data => [...data, item, isNew])
  ),
  [Types.SAVE_LOCAL_ITEM_FAIL]: (state, { message, isNew }) => (
    state.update("data", data => [...data, message, isNew])
  ),
  [Types.SAVE_CLOUD_ITEM]: state => state.merge({ loading: true }),
  [Types.SAVE_CLAUD_ITEM_SUCCESS]: (state, { item, isNew }) =>
    state.update("data", data => [...data, item, isNew]),
  [Types.SAVE_CLAUD_ITEM_FAIL]: (state, { message, isNew }) =>
    state.update("data", data => [...data, message, isNew]),
});