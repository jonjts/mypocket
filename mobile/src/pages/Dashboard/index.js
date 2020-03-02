import React, { useState, useEffect } from 'react';
import getRealm from '~/services/realm';
import moment from "moment";
import { useSelector } from 'react-redux'

import { PieChart } from 'react-native-charts-wrapper';
import NumberFormat from 'react-number-format';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import Card from '~/components/Card'
import SelectMonthContainer from '~/components/date/SelectMonthContainer'
import theme from '~/theme/light'
import {
  Text,
  View,
  StyleSheet,
  processColor
} from 'react-native';

export default function Dashboard({ navigation }) {

  const [showSelectMonth, setShowSelectMonth] = useState(false)
  const [month, setMonth] = useState(moment().locale('pt-br'))

  const [totalReceita, setTotalReceita] = useState(null)
  const [totalDespesa, setTotalDespesa] = useState(null)
  const [saldo, setSaldo] = useState(0.0)

  const itensChange = useSelector(state => state.itens.token)

  useEffect(() => {
    loadDashboard()
  }, [month, itensChange])

  useEffect(() => {
    if (totalReceita && totalDespesa) {
      setSaldo(totalReceita - totalDespesa)
    } else {
      setSaldo(0.001)
    }
  }, [totalDespesa, totalReceita])

  async function loadDashboard() {
    try {
      setTotalReceita(null)
      setTotalReceita(null)
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


        setTotalDespesa(despesas || 0.0001)
        setTotalReceita(receitas || 0.0001)
      })

    } catch (error) {
      console.log('Falha ao carregar dashboard', error)
    }
  }

  function chartPercent() {
    if (totalDespesa.toFixed(0) == 0 && totalReceita.toFixed(0) == 0) return '0%'
    const percent = (totalDespesa / totalReceita * 100).toFixed(0)
    return `${percent > 100 ? '+100' : percent}%`
  }


  const ContentCard = ({ color, label, valor }) => (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        height: 19
      }}
    >
      <View
        style={{
          flex: 0.1,
          display: 'flex',
          alignSelf: 'center',
        }}
      >
        <View
          style={{
            display: 'flex',
            borderColor: color,
            borderWidth: 2.5,
            borderRadius: 10,
            width: 10,
            height: 10,
          }}
        >
          <View
            style={{
              width: 5,
              height: 5,
              borderWidth: 2.5,
              borderRadius: 5,
              borderColor: '#fff',
              display: 'flex',
              justifyContent: 'center',
              alignSelf: 'center'

            }}
          >
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 0.35,
          display: 'flex',
          alignSelf: 'center',
        }}
      >
        <Text
          style={{
            color: theme.color.default,
            fontSize: 16,
            lineHeight: 19
          }}
        >
          {label}
        </Text>
      </View>
      <View
        style={{
          flex: .55,
          display: 'flex',
          alignSelf: 'center',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          alignContent: 'flex-end'
        }}
      >
        <ShimmerPlaceHolder
          width={40}
          autoRun={true}
          visible={valor != null}>
          <NumberFormat
            value={valor}
            displayType={'text'}
            thousandSeparator={true}
            decimalScale={2}
            prefix={'R$ '}
            fixedDecimalScale={true}
            renderText={value => <Text
              style={{
                color,
                fontSize: 16,
                lineHeight: 19,
              }}
            >
              {value}
            </Text>}
          />
        </ShimmerPlaceHolder>
      </View>

    </View>
  )

  const MyPieChart = () => (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <PieChart
        style={styles.chart}
        logEnabled={true}
        data={{
          dataSets: [{
            values: [{ value: totalDespesa },
            { value: totalReceita.toFixed(0) <= 0 ? 0 : saldo },],
            label: 'Pie dataset',
            config: {
              colors: [
                processColor((totalReceita.toFixed(0) == 0 && totalDespesa.toFixed(0) == 0) ? theme.color.primary : theme.color.danger),
                processColor(theme.color.success)],
              valueTextSize: 0,
              valueTextColor: processColor('green'),
              sliceSpace: 0,
              selectionShift: 0,

              valueFormatter: "#.#'%'",
              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5
            }
          }],
          legend: {
            enabled: false
          }
        }}
        legend={{
          enabled: false,
        }}
        highlights={[{ x: 1 }]}
        animation={{
          durationX: 500,
          durationY: 500,
        }}
        entryLabelColor={processColor('green')}
        entryLabelTextSize={20}
        drawEntryLabels={false}
        chartDescription={{ text: '' }}
        rotationEnabled={true}
        rotationAngle={45}
        usePercentValues={true}
        styledCenterText={{
          text: chartPercent(),
          color: processColor(theme.color.primary),
          size: 56
        }}
        centerTextRadiusPercent={100}
        holeRadius={92}
        holeColor={processColor('#fff')}
        transparentCircleColor={processColor('#f0f0f088')}
        maxAngle={360}
        onChange={(event) => console.log(event.nativeEvent)}

      />
      <View
        style={styles.gauge}
      >
        <Text
          style={styles.gaugeText}
        >
          Gastos da receita
        </Text>
      </View>
    </View>
  )


  return (
    <SelectMonthContainer
      onMonthChanged={setMonth}
      monitorToHide={showSelectMonth}
    >
      <Card
        style={{
          flex: .2,
          paddingTop: 12,
          paddingBottom: 12
        }}
      >
        <ContentCard
          label="Receita"
          color={theme.color.primary}
          valor={totalReceita}
        >
        </ContentCard>
        <ContentCard
          label="Despesa"
          color={theme.color.danger}
          valor={totalDespesa}
        >
        </ContentCard>
        <ContentCard
          label="Saldo"
          color={theme.color.success}
          valor={saldo}
        >
        </ContentCard>

      </Card>

      <View
        style={{
          display: 'flex',
          flex: .8,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View style={styles.container}>
          {
            (totalDespesa && totalReceita) &&

            <MyPieChart />
          }
        </View>


      </View>

    </SelectMonthContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chart: {
    width: 230,
    height: 230,
    alignSelf: 'center'
  },
  gauge: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gaugeText: {
    backgroundColor: 'transparent',
    color: theme.color.secondary,
    fontSize: 14,
    fontWeight: 'normal',
    marginTop: 60
  },
});