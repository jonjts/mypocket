import { call, put } from "redux-saga/effects";
import utils from '~/utils'
import api from "~/services/api";
import getRealm from '~/services/realm';
import Snackbar from 'react-native-snackbar';

import ItensActions from "~/store/ducks/itens";


export function* findAll({ params }) {
  const realm = yield getRealm();
  try {
    const {
      page = 1,
      limit = 1000,
      month, year
    } = params
    const credentials = yield utils.credentials();
    const response = yield call(api.get, `/users/${credentials.user_id}/itens`, {
      params: {
        month,
        year,
        page,
        limit,
      }
    });

    //Interar o array de itens do backand
    for (let element of response.data.data) {
      const model = yield utils.getModel('Item', element.id)
      const categoriaModal = yield utils.getModel('Categoria', element.categoria_id)
      const userModel = yield utils.getUserModel()

      //Ajusta o fields para serem inseridos/alterados
      element.categoria = categoriaModal
      element.categoria_id = categoriaModal.id
      element.valor = parseFloat(element.valor)
      element.user = userModel
      element.realizado_em = new Date(element.realizado_em)
      element.created_at = new Date(element.created_at)
      element.updated_at = new Date(element.updated_at)
      element.sent_at = new Date()

      //Caso não exista o model...
      if (!model) {
        realm.write(() => {
          realm.create('Item', element, true)
        });
      } else { //Caso exista...
        if (element.deleted_at && !model.deleted_at) { 
          //Caso tenha sido removido localmente...
          realm.write(() => {
            realm.delete(model)
          });
          
        } else if (!element.deleted_at && model.deleted_at) {
          //Caso nao tenha sido removido remotamente...
          yield put(ItensActions.deleteCloud({ id: model.id }))

        } else if (element.updated_at != model.updated_at) {
          if (element.updated_at.getTime() > model.updated_at.getTime()) {

            //Se no servidor estiver mais atualizado, atualiza localmente
            realm.write(() => {
              //realm.create('Item', element, 'modified')
              model.updated_at = element.updated_at
              model.valor = element.valor
              model.descricao = element.descricao
              model.categoria = element.categoria
              model.tipo = element.tipo
              model.realizado_em = element.realizado_em
            });
          } else if (model.updated_at.getTime() > element.updated_at.getTime()) {
            //Se tiver desatualizado no servidor...
            yield put(ItensActions.saveCloudItem(
              {
                ...model,
                categoria_id: model.categoria.id
              },
              false))
          }
        }

      }
    }

    yield put(ItensActions.findAllFinished({
      ...params
    }))
  } catch (error) {
    console.warn('Falha ao salvar novos itens', error)
    yield put(ItensActions.findAllFinished({
      ...params,
      error: true,
    }))
  }
}

export function* saveLocal({ item_data, isNew = true }) {
  try {
    const realm = yield getRealm();
    yield realm.write(() => {
      realm.create('Item', item_data, true)
    });
    yield put(ItensActions.saveLocalItemSuccess(item_data, isNew))
  } catch (error) {
    console.warn(error)
    yield put(ItensActions.saveLocalItemFail(error, isNew))
  }
}

export function* saveCloud({ item_data, isNew = true }) {
  const realm = yield getRealm();
  try {
    const credentials = yield utils.credentials();
    if (isNew) {
      yield call(api.post, `/users/${credentials.user_id}/itens`, item_data);
    } else {
      yield call(api.put, `/users/${credentials.user_id}/itens/${item_data.id}`, item_data);
    }
    //Atualiza a data de atualização
    realm.write(() => {
      let model = realm.objects('Item').filtered(` id = '${item_data.id}'`);
      if (model.length > 0) {
        model[0].sent_at = new Date()
      }
    })

    //Dispara que salvou com sucesso
    yield put(ItensActions.saveCloudItemSuccess({
      ...item_data,
    }, isNew))
  } catch (error) {
    if (error.response) {
      console.log(error.response)
    } else {
      console.log(error)
    }
    yield put(ItensActions.saveCloudItemFail(error, isNew))
  }
}


export function* deleteCloud({ params }) {
  try {
    const { id } = params
    if (!id) return

    const credentials = yield utils.credentials();
    yield call(api.delete, `/users/${credentials.user_id}/itens/${id}`);

    //Remove localmente
    const realm = yield getRealm();
    realm.write(() => {
      const model = realm.objects('Item').filtered(` id = '${id}'`);
      realm.delete(model)
    })

  } catch (error) {
    if (error.response) {
      console.log(error.response)
    } else {
      console.log(error)
    }
  }
}