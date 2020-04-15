import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import {StyleSheet, View, Text, FlatList, Button} from 'react-native';

import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';
import Colors from "../../constants/Colors";
import TitleText from "../../components/TitleText";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/ui/Card";

/**
 * Created by Doa on 6-4-2020.
 */
const CartScreen = props => {

    const dispatch = useDispatch();
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push(
                {
                    productId: key,
                    productTitle: state.cart.items[key].productTitle,
                    productPrice: state.cart.items[key].productPrice,
                    quantity: state.cart.items[key].quantity,
                    sum: state.cart.items[key].sum
                }
            )
        }
        return transformedCartItems.sort(
            (a, b) => a.productId > b.productId ? 1 : -1)
    });

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <TitleText>
                    Total: <Text style={styles.amount}>
                    {/*JS floating point is not that accurate, to fix problems, round it like this*/}
                    ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
                </Text>
                </TitleText>
                <Button
                    disabled={cartItems.length === 0}
                    color={Colors.accent}
                    title="Order Now"
                onPress={() => {
                    dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
                }}/>
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem item={itemData.item}
                              onRemove={() => {
                                  dispatch(
                                      cartActions.removeFromCart(itemData.item.productId))
                              }}/>}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        margin: 20,

    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
    },
    amount: {
        color: Colors.primary
    }
});

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
};

export default CartScreen;