import React from 'react';
import {StyleSheet, View, Text, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import Colors from "../../constants/Colors";
import TitleText from "../TitleText";
import BodyText from "../BodyText";
import Card from "../ui/Card";

/**
 * Created by Doa on 7-4-2020.
 */
const ProductItem = ({product, onSelect, children}) => {
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback
    }
    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image source={{uri: product.imageUrl}} style={styles.image}/>
                        </View>
                        <View style={styles.details}>
                            <TitleText style={styles.title}>{product.title}</TitleText>
                            <BodyText style={styles.price}>${product.price.toFixed(2)}</BodyText>
                        </View>
                        <View style={styles.actions}>
                            {children}
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </Card>

    )
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 20,
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20
    },
});

export default ProductItem;