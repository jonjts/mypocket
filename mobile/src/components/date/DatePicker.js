import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import MaskTextField from '~/components/MaskTextField'
import DateTimePicker from '@react-native-community/datetimepicker';
import calendarIcon from '../../assets/images/calendar.png'

import 'moment/locale/pt-br'
import moment from 'moment';

import styles from './styles';

export default function DatePicker({ error, placeholder, date = (moment().format('DD/MM/YYYY')), onDateChange, mode = 'date', ...props }) {

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
                            onDateChange(formatted)
                        }}
                        error={error}
                        type={'datetime'}
                        style={[styles.input, props.style]}
                        placeholderTextColor={error ? "#FC451D" : "#a7a7a7"}
                        placeholder={placeholder}
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
                        onPress={() => setShowPicker(true)}
                    >
                        <Image
                            style={{ width: 16, height: 16, alignItems: 'center', alignSelf: 'center' }}
                            source={calendarIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            {
                showPicker ?
                    (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={date ? (moment(date, 'DD/MM/YYYY').valueOf()) : new Date()}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={(event, date) => {
                                setShowPicker(Platform.OS === 'ios');
                                if (date) {
                                    onDateChange(moment(new Date(date)).format('DD/MM/YYYY'))
                                }
                            }}
                            locale="pt-BR"
                        />
                    )
                    : null
            }
        </View>
    );
}
