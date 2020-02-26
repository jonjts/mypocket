import React, { useState, useEffect, useMemo } from 'react';
import moment from "~/utils/moments";
import getRealm from '~/services/realm';

import theme from '~/theme/light'

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import Icon from 'react-native-vector-icons/Feather';
var styles = require('./styles');
import QuestionModal from '~/components/modal/QuestionModal'
import utils from '~/utils'
import List from '~/components/List/Item'
import Header from '../../components/Header'
import SelectMonth from '~/components/date/SelectMonth'
import Card from '~/components/Card'
import NumberFormat from 'react-number-format';
import Snackbar from 'react-native-snackbar';

import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux'
import { ItensTypes } from '~/store/ducks/itens'

export default function Itens({ navigation }) {

  const [showSelect, setShowSelect] = useState(false)
  const [totalReceitas, setTotalReceitas] = useState(2000.90)
  const [totalDespesas, setTotalDespesas] = useState(1000.00)
  const [month, setMonth] = useState(null)
  const [pageProperties, setPageProperties] = useState({ page: -1, limit: 10 })
  //Indica se exite mais itens para serem carregados
  const [hasMoreToLoad, setHasMoreToLoad] = useState(true)

  //Indica o item que será removido
  const [itemToDelete, setItemToDelete] = useState(null)

  const [itens, setItens] = useState([])
  //Indica se está carregando mais itens pela paginacao
  const [loadingMoreItens, setLoadMoreItens] = useState(false)

  //indica se está carregando itens via api
  const loadingItens = useSelector(state => state.itens.loading)
  //indica se ouve alguma mudança nos itens
  const itensChange = useSelector(state => state.itens.token)

  const dispatch = useDispatch()

  useEffect(() => {
    setItens([])
    if (!loadingItens) {
      setPageProperties({
        ...pageProperties,
        page: 1,
      })
      loadDashboard()
    }
  }, [loadingItens])

  useEffect(() => {
    if (month == null) return
    setItens([])
    setPageProperties({
      ...pageProperties,
      page: 0,
      month: month
    })
  }, [month])

  useEffect(() => {
    if (pageProperties.page === 0) {
      dispatchFindAllItens()
      setTotalReceitas(null)
      setTotalDespesas(null)
    }
  }, [pageProperties])

  useEffect(() => {
    if (itensChange) {
      setItens([])
      setPageProperties({ ...pageProperties, page: 1, })
    }
  }, [itensChange])

  useEffect(() => {
    if (pageProperties.page > 0) {
      loadItens()
      loadDashboard()
    }
  }, [pageProperties])

  function showSnack({ error = false, msg, duration = Snackbar.LENGTH_LONG }) {
    Snackbar.show({
      title: msg,
      color: '#fff',
      duration: duration,
      backgroundColor: error ? theme.color.danger : theme.color.primary,
      action: {
        title: 'OK',
        color: '#fff',
        onPress: () => { /* Do something. */ },
      },
    });
  }

  function dispatchFindAllItens() {
    try {
      dispatch({
        type: ItensTypes.FIND_ALL,
        params: {
          month: month.month() + 1,
          year: month.year(),
          limit: 1000
        },
        loading: true
      })
    } catch (error) {
      console.warn(error)
      showSnack({
        error: true,
        msg: 'Não conseguimos atualizar seus itens'
      })
    }
  }

  async function loadDashboard() {
    try {
      setTotalReceitas(null)
      setTotalDespesas(null)
      const firstDay = new Date(month?.startOf('month').valueOf())
      const lastDay = new Date(month?.endOf('month').valueOf())
      const realm = await getRealm();

      realm.write(() => {

        const query = `realizado_em >= $0 AND realizado_em <= $1 AND deleted_at = $2 AND tipo = $3`
        let despesas = realm
          .objects('Item')
          .filtered(query, firstDay, lastDay, null, 'D')
          .sum('valor')

        let receitas = realm
          .objects('Item')
          .filtered(query, firstDay, lastDay, null, 'R')
          .sum('valor')


        setTotalDespesas(despesas || 0.0001)
        setTotalReceitas(receitas || 0.0001)
      })

    } catch (error) {
      console.warn('Falha ao carregar dashboard', error)
    }
  }

  async function loadItens() {
    setLoadMoreItens(true)
    try {
      const firstDay = new Date(month.startOf('month').valueOf())
      const lastDay = new Date(month.endOf('month').valueOf())
      const realm = await getRealm();

      let newItens = []
      const oldItens = itens

      const limit = pageProperties.page * pageProperties.limit;
      const offset = (pageProperties.page - 1) * pageProperties.limit

      realm.write(() => {
        const query = `realizado_em >= $0 AND realizado_em <= $1 AND deleted_at = $2`
        newItens = realm
          .objects('Item')
          .filtered(query, firstDay, lastDay, null)
          .sorted('realizado_em', true)
          .slice(offset, limit)
      })
      //Verifica se terá mais itens para carregar...
      setHasMoreToLoad(newItens.length == pageProperties.limit)
      //Agroupa os itens pela data de realização
      newItens = groupBy(Array.from(newItens))
      //adiciona os novos itens ao itens atuais
      newItens = oldItens.concat(Array.from(newItens))
      //Atualiza a lista de itens
      setItens(newItens)
    } catch (error) {
      console.warn('Falha ao carregar itens', error)
    }
    setLoadMoreItens(false)
  }

  function groupBy(array) {
    const groupArray = []
    const now = moment()
    for (let value of array) {
      const date = moment(value.realizado_em)

      let header = date.format('DD MMM YYYY')
      //header = header === now.format('DD MMM YYYY') ? 'Hoje' : header === now.subtract(1, 'days').format('DD MMM YYYY') ? 'Ontem' : header

      if (array.indexOf(value) == 0) {
        //Caso seja o primeiro item, veriifica se os itens anteriores já possuem o cabeçalho
        const find = itens.find(item => item.header === header)
        if (find) {
          //Caso já tenha o header, só coloca o novo item e pula para o proximo
          groupArray.push(value)
          continue
        }
      }
      //Verifica se já existe o header na lista nova
      const findInGroup = groupArray.find(item => item.header === header)
      //Verifica se já exixe na lista atual
      const findInItens = itens.find(item => item.header === header)
      //Se nao existe em nenhuma das listas adiciona o novo header
      if (!findInGroup && !findInItens) groupArray.push({ header, time: date.valueOf() })

      groupArray.push(value)
    }
    return groupArray
  }

  const editItem = async (item_id) => {
    const realm = await getRealm();
    let item = {}
    realm.write(() => {
      item = realm.objects('Item').filtered(` id = '${item_id}'`)[0];
    })

    if (!item || item.deleted_at) {
      showSnack({
        msg: 'Não é possível editar item',
        error: true
      })
      return
    }

    navigation.navigate('NewItem', { item })
  }

  const deleteItem = async () => {
    try {
      const realm = await getRealm();
      realm.write(() => {
        let model = realm.objects('Item').filtered(` id = '${itemToDelete}'`)[0];
        model.deleted_at = new Date()
        model.sent_at = null
      })

      dispatch({
        type: ItensTypes.DELETE_CLOUD_ITEM,
        params: {
          id: itemToDelete
        },
      })

      //Redefine alguns states para carregar a lista novamente
      setItens([])
      setPageProperties({ ...pageProperties, page: 1 })
      setItemToDelete(null)
      //Exibe a mensagem de successo
      setTimeout(() =>
        showSnack({
          msg: 'Item removido',
        }), 1000)
    } catch (error) {
      console.log(error)
      showSnack({
        error: true,
        msg: 'Não foi possível remover item.'
      })
    }
  }


  const mainHeader = () => (
    <View
      style={{
        height: 80
      }}
    >
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', display: 'flex', flex: 1, alignContent: "space-around" }}>
          <Card style={[{ marginRight: 0, }, styles.cardContainer]}>
            <Text style={[styles.cardLabel, utils.styles.mainLabelColor]}>
              Receitas
            </Text>
            {
              totalReceitas ?
                <NumberFormat
                  value={totalReceitas}
                  displayType={'text'}
                  thousandSeparator={true}
                  decimalScale={2}
                  prefix={'R$'}
                  fixedDecimalScale={true}
                  renderText={value => <Text style={[styles.cardMoney, { color: '#3AB9CE' }]}>
                    {value}
                  </Text>}
                />
                :
                <ShimmerPlaceHolder height={15}
                  width={70}
                  autoRun={true} />
            }

          </Card>
          <View style={{ width: 4 }}>
          </View>
          <Card style={[{ marginLeft: 0 }, styles.cardContainer]} >
            <Text style={[styles.cardLabel, utils.styles.mainLabelColor]}>
              Despesas
            </Text>

            {
              totalDespesas ?
                <NumberFormat
                  value={totalDespesas}
                  displayType={'text'}
                  thousandSeparator={true}
                  decimalScale={2}
                  prefix={'R$'}
                  fixedDecimalScale={true}
                  renderText={value => <Text style={[styles.cardMoney, { color: theme.color.danger }]}>
                    {value}
                  </Text>}
                />
                :
                <ShimmerPlaceHolder height={15}
                  width={70}
                  autoRun={true} />
            }

          </Card>

        </View>
      </View>
    </View>
  )


  return (
    <SafeAreaView style={[{ display: 'flex', flex: 1, backgroundColor: '#F3F3F3' }]}>
      <QuestionModal
        isVisible={itemToDelete}
        backAction={() => setItemToDelete(null)}
        icon={
          <Icon
            style={{ alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}
            name='trash-2'
            size={35}
            color={theme.color.danger}
          />}
        backText="Cancelar"
        cofirmText="Sim"
        confirmAction={deleteItem}
      >
        <Text
          style={{
            fontSize: 16,
            lineHeight: 24,
            textAlign: "center",
            color: theme.color.secondary,
            padding: 19
          }}
        >
          Você deseja realmente excluir este item?
        </Text>
      </QuestionModal>
      <View style={StyleSheet.absoluteFill, { flex: 1 }}>
        <Header
        />
        <View style={
          utils.styles.mainContainer
        }>
          <SelectMonth
            monitorToHide={showSelect}
            onMonthChanged={setMonth}
          />
          <View
            style={{
              flex: 1
            }}
          >
            <List
              itens={itens}
              loading={(loadingItens || loadingMoreItens) && hasMoreToLoad}
              load={dispatchFindAllItens}
              onDelete={setItemToDelete}
              onEdit={editItem}
              header={mainHeader()}
              onMoreItens={() => {
                setLoadMoreItens(true)
                setPageProperties(
                  {
                    ...pageProperties,
                    page: pageProperties.page + 1
                  }
                )
              }}
            />
          </View>
        </View>

      </View>
    </SafeAreaView>
  )
}