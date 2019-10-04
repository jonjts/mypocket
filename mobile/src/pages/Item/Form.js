import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Picker,
  TouchableOpacity
} from 'react-native';
import Card from '~/components/Card'
import TextField from '../../components/TextField';
import MaskTextField from '~/components/MaskTextField'
import DatePicker from '~/components/date/DatePicker'
import SelectField from '~/components/SelectField'
import RadioForm from 'react-native-simple-radio-button';
import GradientButton from '~/components/buttons/GradientButton'

import validation from '~/validation'
import rules from './rules'
import moment from "moment";
let uuid = require('react-native-uuid');
import utils from '~/utils'

import styles from './styles';

import { Text } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux'
import { CategoriasTypes } from '~/store/ducks/categorias'
import { TiposTypes } from '~/store/ducks/tipos'

const Form = ({ navigation, item, ...props }) => {

  const [data, setData] = useState('')
  const [valor, setValor] = useState(item ? item.valor : null)
  const [tipo, setTipo] = useState(item ? item.tipo : null)
  const [categoria, setCategoria] = useState(item ? item.categoria : null)
  const [descricao, setDescricao] = useState(item ? item.descricao : null)
  const [errors, setErrors] = useState({})

  const scroll = useRef()

  const categorias = useSelector(state => state.categorias.data)
  const tipos = useSelector(state => state.tipos.data)


  const dispacth = useDispatch()

  useEffect(() => {
    dispacth({ type: CategoriasTypes.LOAD_CATEGORIAS })
    dispacth({ type: TiposTypes.LOAD_TIPOS })
  }, [item])

  useEffect(() => {
    if (tipos && tipos.length > 0) {
      setTipo(tipos[0]._id)
    }
  }, [tipos])

  async function handleSalvar() {
    const item = {
      _id: item ? item._id : uuid.v4(),
      data: data,
      valor: valor,
      tipo: tipo,
      categoria: categoria,
      descricao: descricao
    }
    const result = await validation(item, rules)
    setErrors(result ? result : {})
    scrolling(result)
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
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: ''
            }}
            value={valor}
            onChangeText={text => {
              setValor(text)
            }}
            error={errors.valor}
          />
          <RadioForm
            radio_props={
              tipos.map((item) => (
                {
                  value: item._id,
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
            onValueChange={(itemValue, itemIndex) =>
              setCategoria(itemValue)
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
                  key={item._id}
                  color="#105762"
                  style={{ color: '#004C58' }}
                  label={item.nome}
                  value={item._id} />
              ))
            }
          </SelectField>
        </ScrollView>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            paddingBottom: 20,
            paddingTop: 18,
          }}>
          <TouchableOpacity
            style={{ alignSelf: 'flex-end', height: 30, }}
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
  )
}

export default Form;
