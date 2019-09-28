import React, { useState, useEffect, useRef } from 'react'
const styles = require('./styles');
import moment from "moment";
import 'moment/locale/pt-br'
import Icon from 'react-native-vector-icons/Feather';

import Card from '~/components/Card'

import {
    Modal,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';
import { func } from 'prop-types';

const SelectMonth = ({ onSelectShow, ...props }) => {

    const [showSelect, setShowSelect] = useState(false)
    const [month, setMonth] = useState(moment().locale('pt-br'))
    const [yearSelected, setYearSelected] = useState(false)
    const [animation] = useState(new Animated.Value(-Dimensions.get('window').height))

    const container = useRef()

    React.useEffect(() => {
        if (showSelect) {
            Animated.timing(
                animation,
                {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }
            ).start();
        } else {
            Animated.timing(
                animation,
                {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }
            ).start();
        }
    }, [showSelect])

    useEffect(() => {
        setShowSelect(false)
    }, [props.monitorToHide])

    function handleYearBack() {
        setMonth(moment(month.subtract(1, 'year')))
    }

    function handleYearNext() {
        setMonth(moment(month.add(1, 'year')))
    }

    function handleMonthBack() {
        setMonth(moment(month.subtract(1, 'months')))
    }

    function handleMonthNext() {
        setMonth(moment(month.add(1, 'months')))
    }

    function slideUp() {
        const screenHeight = 4;
        const slideUp = {
            transform: [
                {
                    translateY: animation.interpolate({
                        inputRange: [0.01, 1],
                        outputRange: [0, 1 * screenHeight],
                        extrapolate: "clamp",
                    }),
                },
            ],
        };
        return slideUp;
    }

    return (
        <>
            <View
                style={[{
                    paddingBottom: Dimensions.get('window').height * 0.05,
                },
                showSelect ? { height: 112 } : {}
                ]}
                ref={container}>
                {
                    showSelect ?

                        <Animated.View                 // Special animatable View
                            style={[{ opacity: animation },
                            StyleSheet.absoluteFill,
                            slideUp()
                            ]}
                        >
                            <Card style={[styles.height]}>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', marginBottom: -15 }}>
                                    {
                                        yearSelected ?

                                            <TouchableOpacity
                                                style={[styles.cardNavigation, styles.cardNavigationRight]}
                                                onPress={handleYearBack}
                                            >
                                                <Icon
                                                    name="chevron-left"
                                                    size={20}
                                                    color="#828282"
                                                    style={styles.iconLeft}
                                                />
                                            </TouchableOpacity>
                                            : null
                                    }
                                    <TouchableOpacity
                                        style={{
                                            display: 'flex',
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignContent: 'center'
                                        }}
                                        onPress={() => setYearSelected(true)}
                                    >
                                        <Text style={[styles.monthSelectorLabel, styles.selectorColor,]}>
                                            {month.format('YYYY')}
                                        </Text>
                                    </TouchableOpacity>
                                    {
                                        yearSelected ?
                                            <TouchableOpacity
                                                style={[styles.cardNavigation, styles.cardNavigationLeft]}
                                                onPress={handleYearNext}
                                            >
                                                <Icon
                                                    name="chevron-right"
                                                    size={20}
                                                    color="#828282"
                                                    style={styles.iconRight}
                                                />

                                            </TouchableOpacity>
                                            :
                                            null
                                    }
                                </View>
                                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                                    {
                                        !yearSelected ?

                                            <TouchableOpacity
                                                style={[styles.cardNavigation, styles.cardNavigationRight]}
                                                onPress={handleMonthBack}
                                            >
                                                <Icon
                                                    name="chevron-left"
                                                    size={20}
                                                    color="#828282"
                                                    style={styles.iconLeft}
                                                />
                                            </TouchableOpacity>
                                            : null
                                    }
                                    <TouchableOpacity
                                        style={{
                                            display: 'flex',
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            alignContent: 'center'
                                        }}
                                        onPress={() => setYearSelected(false)}
                                    >
                                        <Text style={[styles.monthSelectorLabel, styles.selectorColor,]}>
                                            {month.format('MMMM')}
                                        </Text>
                                    </TouchableOpacity>
                                    {
                                        !yearSelected ?
                                            <TouchableOpacity
                                                style={[styles.cardNavigation, styles.cardNavigationLeft]}
                                                onPress={handleMonthNext}
                                            >
                                                <Icon
                                                    name="chevron-right"
                                                    size={20}
                                                    color="#828282"
                                                    style={styles.iconRight}
                                                />

                                            </TouchableOpacity>
                                            :
                                            null
                                    }
                                </View>
                            </Card>
                        </Animated.View>

                        :
                        <View style={styles.monthLabelContainer}>
                            <TouchableOpacity
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    minHeight: 40
                                }}
                                onPress={() => setShowSelect(true)}
                            >
                                <Text style={styles.monthLabel}>
                                    {month.format('MMMM, YYYY')}
                                </Text>
                                <Icon
                                    name="calendar"
                                    size={16}
                                    color="#fff"
                                />
                            </TouchableOpacity>

                        </View>
                }

            </View>
        </>
    )

}

export default SelectMonth