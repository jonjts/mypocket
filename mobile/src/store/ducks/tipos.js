import { createReducer, createActions } from "reduxsauce";
import { markActionsOffline } from "redux-offline-queue";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  updateTipos: [],
  updateTiposSuccess: ["tipos"],
  loadTipos: [],
  loadTiposSuccess: ['tipos']
});

markActionsOffline(Creators, ["updateTipos"]);

export const TiposTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false
});

/* Reducers */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_TIPOS]: state => state.merge({ loading: true }),
  [Types.UPDATE_TIPOS_SUCCESS]: (state, { tipos }) => (
    state.update("data", data => [...data, tipos])
  ),
  [Types.LOAD_TIPOS]: state => state.merge({ loading: true }),
  [Types.LOAD_TIPOS_SUCCESS]: (state, { tipos }) =>
    state.update("data", data => tipos),  

});