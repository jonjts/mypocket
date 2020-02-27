import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
  Text,
  TouchableOpacity
} from 'react-native';

import theme from '~/theme/light'

import QuestionModal from '~/components/modal/QuestionModal'
import Icon from 'react-native-vector-icons/Feather';
import Snackbar from 'react-native-snackbar';
import Footer from '~/components/Form/Footer'
import Progress from '~/components/modal/Progress'
import Card from '~/components/Card'
import TextField from '../../components/TextField';
import MaskTextField from '~/components/MaskTextField'
import DatePicker from '~/components/date/DatePicker'
import SelectField from '~/components/SelectField'
import RadioButton from '~/components/buttons/RadioButton'
import moment from "~/utils/moments";

import validation from '~/validation'
import rules from './rules'

import getRealm from '~/services/realm'
let uuid = require('react-native-uuid');
import utils from '~/utils'

import styles from './styles';

import { useDispatch, useSelector } from 'react-redux'
import { ItensTypes } from '~/store/ducks/itens'

const Form = ({ navigation, ...props }) => {

  const [item, setItem] = useState({})
  const [data, setData] = useState(moment(new Date()).format('DD/MM/YYYY'))
  const [valor, setValor] = useState(null)
  const [tipo, setTipo] = useState('D')
  const [categoria, setCategoria] = useState(null)
  const [descricao, setDescricao] = useState(null)
  const [errors, setErrors] = useState({})
  const [showProgress, setShowProgress] = useState(false)
  const [askToDelete, setAskToDelete] = useState(false)

  const scroll = useRef()

  //Dados para carregar no form
  const [categorias, setCategorias] = useState([])
  const [tipos] = useState([{ id: 'D', nome: 'Despesa' }, { id: 'R', nome: 'Receita' }])
  //Retorno do salvamento do item
  const messageFail = useSelector(state => state.itens.message)

  const dispacth = useDispatch()

  useEffect(() => {
    if (categorias.length === 0) loadCategorias()
  }, [])

  useEffect(() => {
    if (item.id) {
      const realizadoEm = moment(item.realizado_em, 'DD/MM/YYYY')
      setData(realizadoEm.format('DD/MM/YYYY'))
      setValor(item.valor)
      setTipo(item.tipo)
      setCategoria(item.categoria.id)
      setDescricao(item.descricao)
    }
  }, [item])

  useEffect(() => {
    if (navigation.state.params && navigation.state.params.item) {
      setItem(navigation.state.params.item)
    }
  }, [navigation])

  useEffect(() => {
    if (messageFail) {
      setShowAlert(true)
      setAlertText("Não foi possível salvar item")
    }
  }, [messageFail])

  async function loadCategorias() {
    try {
      const realm = await getRealm();
      realm.write(() => {
        const categorias = realm.objects('Categoria').filtered('ativo == true');
        setCategorias(categorias)
      })
    } catch (error) {
      console.error(error)
    }
  }


  async function handleSalvar() {
    setShowProgress(true)
    try {
      const newData = moment(data, 'DD/MM/YYYY')
      const user = await utils.getUserModel()
      const categoriaModal = await utils.getModel('Categoria', categoria)
      const newItem = {
        id: item.id ? item.id : uuid.v1(),
        user,
        realizado_em: data,
        valor,
        tipo,
        categoria: categoriaModal,
        descricao: descricao,
        updated_at: new Date()
      }
      console.log(newItem)
      const result = await validation(newItem, rules)
      setErrors(result ? result : {})
      scrolling(result)
      newItem['realizado_em'] = newData.format('YYYY-MM-DD')
      console.log(result)
      if (!result) {
        saveItem(newItem)
      }
    } catch (error) {
      console.log(error)
    }
    setShowProgress(false)
  }

  function isNew() {
    return item.id ? false : true
  }


  async function saveItem(item) {
    try {
      const realm = await getRealm();
      realm.write(() => {
        if (isNew()) {
          realm.create('Item', item, true)
        } else {
          let model = realm.objects('Item').filtered(` id = '${item.id}'`)[0];
          model.descricao = item.descricao
          model.categoria = item.categoria
          model.valor = item.valor
          model.realizado_em = item.realizado_em
          model.tipo = item.tipo
        }
      });

      const apiItem = {
        ...item,
        categoria_id: item.categoria.id,
      }
      //DIspara á ação para dizer que o item foi salvo localmente
      dispacth({
        type: ItensTypes.SAVE_LOCAL_ITEM_SUCCESS,
      })
      //Dispara a ação para saçvar na nuvem
      dispacth({
        type: ItensTypes.SAVE_CLOUD_ITEM,
        item_data: apiItem,
        isNew: isNew()
      })

      showSnack({ msg: `${item.tipo == 'R' ? 'Receita' : 'Despesa'} salva.`, })

      navigation.goBack()
    } catch (error) {
      console.error(error)
      showSnack({
        msg: 'Não foi possível salvar item',
        error: true,
        duration: Snackbar.LENGTH_INDEFINITE
      })
    }
  }

  const showSnack = ({ msg, duration = Snackbar.LENGTH_LONG, error = false }) => {
    setTimeout(() => {
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
    }, 1000)
  }

  //Scrollar para exibir os fields com errors
  function scrolling(result) {
    if (result == null) {
      return
    }
    if (errors.categoria) {
      scroll.current.scrollToEnd({ animated: true, duration: 800 })
    } else {
      scroll.current.scrollTo({ x: 0, y: 0, animated: true })
    }
  }

  const deleteItem = async () => {
    try {
      const realm = await getRealm();
      realm.write(() => {
        let model = realm.objects('Item').filtered(` id = '${item.id}'`)[0];
        model.deleted_at = new Date()
        model.sent_at
      })

      //Dispara o evento para remover na nuvem
      dispacth({
        type: ItensTypes.DELETE_CLOUD_ITEM,
        params: {
          id: item.id
        },
      })

      dispacth({
        type: ItensTypes.CHANGED,
        params: {
          id: item.id
        },
      })

      //Exibe a mensagem de successo
      navigation.goBack()
      showSnack({ msg: 'Item removido.' })
    } catch (error) {
      console.log(error)
      showSnack({
        error: true,
        msg: 'Não foi possível remover item.'
      })
    }

  }

  const renderDeleteButton = () => (
    <TouchableOpacity
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 16
      }}
      onPress={() => setAskToDelete(true)}
    >
      <Icon
        style={{ alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}
        name='trash-2'
        size={20}
        color={theme.color.danger}
      />
      <Text
        style={{
          color: theme.color.danger,
          fontSize: 14,
        }}
      >
        Excluir
      </Text>
    </TouchableOpacity>
  )


  const renderDeleteModal = () => (
    <QuestionModal
      isVisible={askToDelete}
      backAction={() => setAskToDelete(false)}
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
  )


  return (
    <>
      <Card
        style={[
          utils.styles.mainContainer,
          {
            flex: 1,
            alignSelf: "center",
            marginBottom: 20,
            paddingTop: 16,
            paddingLeft: null,
            paddingRight: null,
            alignSelf: 'center', alignContent: "center",
            alignItems: 'center',
          },
          props.style,
        ]}
      >
        <Progress isVisible={showProgress} />
        {renderDeleteModal()}
        <KeyboardAvoidingView
          style={{
            flex: 1,
          }}
          behavior='padding'
          enabled={Platform.OS === 'ios'}
        >
          <ScrollView
            ref={scroll}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ paddingHorizontal: 25 }}
            style={{ elevation: 40 }}
          >
            <DatePicker
              date={data}
              placeholder={'Data...'}
              onDateChange={(date) => {
                setData(date)
              }}
              error={errors.realizado_em}
            />
            <View
              style={styles.inputContainer}
            >
              <TextField
                label="Descrição"
                placeholder="Digite uma descrição..."
                multiline
                onChangeText={setDescricao}
                value={descricao}
                error={errors.descricao}
              />
            </View>
            <MaskTextField
              label="Valor"
              placeholder="Digite o valor..."
              type="money"
              includeRawValueInChangeText={true}
              options={{
                precision: 2,
                separator: ',',
                delimiter: '.',
                unit: 'R$',
                suffixUnit: ''
              }}
              value={valor}
              onChangeText={(maskedText, rawText) => {
                setValor(rawText)
              }}
              error={errors.valor}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingTop: 24,
                paddingBottom: 13
              }}
            >
              {
                tipos.map((item, key) => (
                  <RadioButton
                    key={key}
                    label={item.nome}
                    selected={tipo == item.id}
                    onPress={() => setTipo(item.id)}
                  />
                ))
              }
            </View>

            <SelectField
              label="Categoria"
              error={errors.categoria}
              selectedValue={categoria}
              onValueChange={(itemValue, itemIndex) => {
                setCategoria(itemValue)
              }
              }
            >
              <Picker.Item
                key={`item_empty`}
                color="#105762"
                label=""
                value="" />
              {
                categorias.map((item, index) => (
                  <Picker.Item
                    key={index}
                    color="#105762"
                    style={{ color: '#004C58' }}
                    label={item.nome}
                    value={item.id} />
                ))
              }
            </SelectField>
            {
              item.id && renderDeleteButton()
            }

          </ScrollView>
          <Footer
            onBackPress={() => navigation.goBack()}
            onSubmitPress={handleSalvar}
          />
        </KeyboardAvoidingView>
      </Card>
    </>
  )
}

export default Form;
