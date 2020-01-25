import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Picker,
  TouchableOpacity,
  Text
} from 'react-native';
import Card from '~/components/Card'
import TextField from '../../components/TextField';
import MaskTextField from '~/components/MaskTextField'
import DatePicker from '~/components/date/DatePicker'
import SelectField from '~/components/SelectField'
import RadioForm from 'react-native-simple-radio-button';
import GradientButton from '~/components/buttons/GradientButton'
import Snackbar from 'react-native-snackbar';
import moment from "moment";

import validation from '~/validation'
import rules from './rules'

import getRealm from '~/services/realm'
let uuid = require('react-native-uuid');
import utils from '~/utils'

import styles from './styles';

import { useDispatch, useSelector } from 'react-redux'
import { CategoriasTypes } from '~/store/ducks/categorias'
import { ItensTypes } from '~/store/ducks/itens'
import { compose } from 'redux';

const Form = ({ navigation, item = {}, ...props }) => {

  const [data, setData] = useState(new Date())
  const [valor, setValor] = useState(null)
  const [tipo, setTipo] = useState('D')
  const [categoria, setCategoria] = useState(null)
  const [descricao, setDescricao] = useState(null)
  const [errors, setErrors] = useState({})

  const scroll = useRef()

  //Dados para carregar no form
  const [categorias, setCategorias] = useState([])
  const [tipos] = useState([{ id: 'D', nome: 'Despesa' }, { id: 'R', nome: 'Receita' }])
  //Retorno do salvamento do item
  const itemSaved = useSelector(state => state.itens.item_data)
  const messageFail = useSelector(state => state.itens.message)

  const dispacth = useDispatch()

  useEffect(() => {
    if (categorias.length === 0) loadCategorias()
  }, [])

  useEffect(() => {
    if (itemSaved) {
      console.log(itemSaved)
      navigation.goBack()
    }
  }, [itemSaved])

  useEffect(() => {
    if (messageFail) {
      console.log(messageFail)
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
    try {
      const newData = moment(data, 'DD/MM/YYYY')
      const user = await utils.getUserModel()
      const categoriaModal = await utils.getModel('Categoria', categoria)
      const newItem = {
        id: item.id ? item.id : uuid.v1(),
        user,
        data: data,
        valor,
        tipo,
        categoria: categoriaModal,
        descricao: descricao
      }
      const result = await validation(newItem, rules)
      setErrors(result ? result : {})
      scrolling(result)
      newItem['data'] = newData.format('YYYY-MM-DD')
      if (!result) {
        saveItem(newItem)
      }
    } catch (error) {
      console.error(error)
    }
  }

  function isNew() {
    return item ? false : true
  }


  async function saveItem(item) {
    try {
      const realm = await getRealm();
      realm.write(() => {
        realm.create('Item', item, true)
      });

      const apiItem = {
        ...item,
        categoria_id: item.id,
      }
      dispacth({
        type: ItensTypes.SAVE_CLOUD_ITEM,
        item_data: apiItem,
        isNew: isNew()
      })
      
    } catch (error) {
      console.error(error)
      setShowAlert(true)
      setAlertText("Não foi possível salvar item")
    }
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


  return (
    <>
      <Card
        style={[{
          flex: 1,
          alignSelf: "center",
          marginBottom: 20,
          paddingTop: 16,
          paddingLeft: null,
          paddingRight: null,
          alignSelf: 'center', alignContent: "center",
          alignItems: 'center',
        },
        props.style
        ]}
      >
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
              value={data}
              onDateChange={(date) => {
                setData(date)
              }}
              error={errors.data}
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
            <RadioForm
              radio_props={
                tipos.map((item) => (
                  {
                    value: item.id,
                    label: item.nome
                  }
                ))
              }
              buttonSize={24}
              onPress={setTipo}
              buttonColor={'#3AB9CE'}
              selectedButtonColor={'#3AB9CE'}
              wrapStyle={{ alignSelf: 'center' }}
              style={{ flex: 1, justifyContent: 'space-around', paddingTop: 24, paddingBottom: 13 }}
              initial={0}
              formHorizontal={true}
              onPress={(value) => setTipo(value)}
            />
            <SelectField
              label="Categoria"
              error={errors.categoria}
              selectedValue={categoria}
              onValueChange={(itemValue, itemIndex) => {
                setCategoria(itemValue)
                console.log(itemValue)
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
          </ScrollView>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              paddingBottom: 20,
              paddingTop: 18,
            }}>
            <TouchableOpacity
              style={{ alignSelf: 'center', height: 30, }}
              onPress={() => navigation.goBack()}>
              <Text
                style={{ color: '#105762' }}
              >
                VOLTAR
                  </Text>
            </TouchableOpacity>
            <GradientButton
              onPress={handleSalvar}
              text="SALVAR"
              style={{ elevation: 4, alignSelf: 'center' }}
            />
          </View>
        </KeyboardAvoidingView>
      </Card>
    </>
  )
}

export default Form;
