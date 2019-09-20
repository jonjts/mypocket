import React, { useState, useEffect } from 'react';

var styles = require('./styles');
import getRealm from '../../services/realm';
import utils from '../../utils'

import {
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

export default function Dashboard({ navigation }) {


  return (
    <SafeAreaView style={[styles.container]}>
      <StatusBar backgroundColor="#3AB9CE" barStyle="light-content" />
      <TouchableOpacity
        onPress={() => utils.logout()}
      >
        <Text >Limpar a parada</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}