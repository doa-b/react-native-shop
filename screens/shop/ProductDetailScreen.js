import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {StyleSheet, View, Text, Button, Image, ScrollView} from 'react-native';

import Colors from "../../constants/Colors";
import TitleText from "../../components/TitleText";
import BodyText from "../../components/BodyText";
import * as cartActions from '../../store/actions/cart';

/**
 * Created by Doa on 6-4-2020.
 */
const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');

    const product = useSelector(state =>
        state.products.availableProducts.find(product => product.id === productId)
    );
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image source={{uri: product.imageUrl}} style={styles.image}/>
            <View style={styles.actions}>
                <Button color={Colors.primary}
                        title="Add to cart"
                        onPress={() => {
                            dispatch(cartActions.addToCart(product))
                        }}/>
            </View>
            <TitleText style={styles.price}>${product.price.toFixed(2)}</TitleText>
            <BodyText style={styles.description}>{product.description}</BodyText>
        </ScrollView>
    )
};

ProductDetailScreen.navigationOptions = navigationData => {
    const title = navigationData.navigation.getParam('title');

    return {
        headerTitle: title
    }
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    },


});

export default ProductDetailScreen;