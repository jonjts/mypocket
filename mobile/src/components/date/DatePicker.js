import React, { useState, useRef } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import TextField from '../TextField'
import MaskTextField from '~/components/MaskTextField'
import calendarIcon from '../../assets/images/calendar.png'
import { BoxShadow } from 'react-native-shadow';

import 'moment/locale/pt-br'
import moment from 'moment';

import styles from './styles';

export default function DatePicker({ error, ...props }) {

    const [date, setDate] = useState(moment().format('DD/MM/YYYY'))
    const [showPicker, setShowPicker] = useState(false)

    return (
        <View>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', paddingBottom: 10 }}>
                <Text style={[styles.label]}>
                    Data
                </Text>
                <View style={styles.textBoxBtnHolder}>
                    <MaskTextField
                        onChangeText={(formatted, extracted) => {
                            setShowPicker(false)
                            setDate(formatted)
                        }}
                        error={error}
                        type={'datetime'}
                        style={[styles.input, props.style]}
                        placeholder='Sua data de nascimento...'
                        returnKeyType={"next"}
                        autoCorrect={false}
                        options={{
                            format: 'DD/MM/YYYY'
                        }}
                        value={date}
                        paddingLeft={16}
                    />
                    <TouchableOpacity
                        style={styles.visibilityBtn}
                        onPress={() => setShowPicker(!showPicker)}
                    >
                        <Image
                            style={{ width: 16, height: 16, alignItems: 'center', alignSelf: 'center' }}
                            source={calendarIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            {
                showPicker ?
                    <View
                        style={[{
                            flexDirection: 'row',
                            backgroundColor: '#ccc',
                        },
                        ]}
                    >
                       
                    </View>
                    :
                    null
            }
        </View>
    );
}
