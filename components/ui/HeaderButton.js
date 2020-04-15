import React from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import {HeaderButton} from "react-navigation-header-buttons";
import {Ionicons} from '@expo/vector-icons'

import Colors from "../../constants/Colors";


/**
 * Created by Doa on 9-4-2020.
 */
const CustomHeaderButton = props => {
    return (
        <HeaderButton {...props}
                      IconComponent={Ionicons}
                      iconSize={23}
                      color={Platform.OS === 'android' ? 'white' : Colors.primary}/>
    )
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;