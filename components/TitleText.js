import React from 'react';
import {StyleSheet, Text} from 'react-native';

/**
 * Created by Doa on 10-3-2020.
 */

const TitleText = props => {
    return (
        <Text style={{...styles.title, ...props.style}}>
            {props.children}
        </Text>
    )
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    }
});

export default TitleText;