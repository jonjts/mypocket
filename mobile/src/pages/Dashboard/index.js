import React, { useState, useEffect } from 'react';

var styles = require('./styles');
import getRealm from '../../services/realm';
import Header from '../../components/Header'

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
      <Header >
        
      </Header>
      
    </SafeAreaView>
  )
}