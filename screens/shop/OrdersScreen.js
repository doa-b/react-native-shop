import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text, FlatList, Platform, Button, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/ui/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from "../../store/actions/orders";
import Colors from "../../constants/Colors";

/**
 * Created by Doa on 6-4-2020.
 */
const OrdersScreen = props => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.orders);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(ordersActions.fetchOrders('u1'));
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        // props.navigation.addListener('willFocus', loadProducts)
        const willFocusSub = props.navigation.addListener('willFocus', () => {
            loadProducts();
        });
        return () => {
            willFocusSub.remove();
        }
    }, [loadProducts]);

    useEffect(() => {
        loadProducts();
    }, [dispatch, loadProducts]);

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Whoops!</Text>
                <Text>{error}</Text>
                <Button title="Try again" onPress={loadProducts} color={Colors.primary}/>
            </View>)
    }
    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        )
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                    <OrderItem order={itemData.item}/>
            }>
        </FlatList>
    )
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu'
                      iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                      onPress={() => {
                          navData.navigation.toggleDrawer();
                      }}/>
            </HeaderButtons>
    }
};

export default OrdersScreen;