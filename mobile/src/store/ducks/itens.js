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
  saveCloudItemFail: ["message", "isNew"],
  findAll: ["params"],
  findAllFinished: ["params"],
  deleteCloudItem: ["params"]
});

markActionsOffline(Creators, ["saveCloudItem", "deleteCloudItem"]);

export const ItensTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  token: null
});

/* Reducers */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DELETE_CLOUD_ITEM]: (state, { params }) => state.merge({ params, }),
  [Types.FIND_ALL]: (state, { params }) => state.merge({ params, loading: true }),
  [Types.FIND_ALL_FINISHED]: (state, { params }) =>
    state.merge({ params, loading: false }),
  [Types.SAVE_LOCAL_ITEM]: state => state.merge({ loading: true }),
  [Types.SAVE_LOCAL_ITEM_SUCCESS]: (state, { item_data }) =>
    state.merge({ item_data, token: (new Date()).getTime() }),
  [Types.SAVE_LOCAL_ITEM_FAIL]: (state, { message, isNew }) => (
    state.update("data", data => [...data, message, isNew])
  ),
  [Types.SAVE_CLOUD_ITEM]: (state, { item_data, isNew }) => state.merge({ loading: true, item_data, isNew }),
  [Types.SAVE_CLOUD_ITEM_SUCCESS]: (state, { item_data, isNew }) =>
    state.merge({ loading: false, item_data, isNew }),
  [Types.SAVE_CLOUD_ITEM_FAIL]: (state, { message, isNew }) =>
    state.update("data", data => [...data, message, isNew]),
});