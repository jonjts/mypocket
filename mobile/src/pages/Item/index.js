import React, { useState, useEffect } from 'react';

var styles = require('./styles');
import utils from '~/utils'
import Header from '../../components/Header'
import SelectMonth from '~/components/date/SelectMonth'
import Card from '~/components/Card'
import NumberFormat from 'react-number-format';

import {
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

export default function Itens({ navigation }) {

  const [showSelect, setShowSelect] = useState(false)
  const [totalReceitas, setTotalReceitas] = useState(2000.90)
  const [totalDespesas, setTotalDespesas] = useState(1000.00)


  return (
    <SafeAreaView style={[{ display: 'flex', flex: 1, backgroundColor: '#F3F3F3' }]}>
      <TouchableWithoutFeedback onPress={() => setShowSelect(!showSelect)} accessible={false}>
        <View style={StyleSheet.absoluteFill}>
          <Header
          />
          <View style={
            utils.styles.mainContainer
          }>
            <SelectMonth
              monitorToHide={showSelect}
            />

            <ScrollView
              keyboardShouldPersistTaps="always"
              showsVerticalScrollIndicator={false}
            >
              <View style={{ flex: 1, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', display: 'flex', flex: 1, alignContent: "space-around" }}>
                  <Card style={[{ marginRight: 0, }, styles.cardContainer]}>
                    <Text style={[styles.cardLabel, utils.styles.mainLabelColor]}>
                      Receitas
                    </Text>

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
                  </Card>
                  <View style={{ width: 4 }}>
                  </View>
                  <Card style={[{ marginLeft: 0 }, styles.cardContainer]} >
                    <Text style={[styles.cardLabel, utils.styles.mainLabelColor]}>
                      Despesas
                    </Text>
                    <NumberFormat
                      value={totalDespesas}
                      thousandSeparator={true}
                      displayType={'text'}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      prefix={'R$'}
                      renderText={value => <Text style={[styles.cardMoney, { color: '#FC451D' }]}>
                        {value}
                      </Text>
                      }
                    />

                  </Card>

                </View>
              </View>


            </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}