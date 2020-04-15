import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

/**
 * Created by Doa on 10-4-2020.
 */
const CartItem = ({item, onRemove}) => {
    return (
        <View  style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text  style={styles.quantity}>{item.quantity} </Text>
                <Text style={styles.mainText}>{item.productTitle}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>${item.sum.toFixed(2)}</Text>
                {
                   !!onRemove && <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
                        <Ionicons
                            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                            size={23}
                            color="red"/>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        justifyContent:'space-between',
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: 'white',
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    deleteButton: {
        marginLeft: 20
    },
});

export default CartItem;