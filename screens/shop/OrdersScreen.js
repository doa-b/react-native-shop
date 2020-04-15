import React from 'react';
import {StyleSheet, View, Text, FlatList, Platform} from 'react-native';
import {useSelector} from "react-redux";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/ui/HeaderButton";
import OrderItem from "../../components/shop/OrderItem";

/**
 * Created by Doa on 6-4-2020.
 */
const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);
    console.log(orders);

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

const styles = StyleSheet.create({});

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