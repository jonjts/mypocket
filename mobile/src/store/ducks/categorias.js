import { createReducer, createActions } from "reduxsauce";
import { markActionsOffline } from "redux-offline-queue";
import Immutable from "seamless-immutable";

/* Types & Action Creators */

const { Types, Creators } = createActions({
  updateCategorias: [],
  updateCategoriasSuccess: ["categorias"],
  loadCategorias: [],
  loadCategoriasSuccess: ['categorias']
});

markActionsOffline(Creators, ["updateCategorias"]);

export const CategoriasTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false
});

/* Reducers */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CATEGORIAS]: state => state.merge({ loading: true }),
  [Types.UPDATE_CATEGORIAS_SUCCESS]: (state, { categorias }) => (
    state.update("data", data => [...data, categorias])
  ),
  [Types.LOAD_CATEGORIAS]: state => state.merge({ loading: true }),
  [Types.LOAD_CATEGORIAS_SUCCESS]: (state, { categorias }) =>
    state.update("data", data => categorias),

});