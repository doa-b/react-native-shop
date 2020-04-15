import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {StyleSheet, FlatList, Platform, Button, View} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import HeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../constants/Colors";

/**
 * Created by Doa on 6-4-2020.
 */
const ProductsOverviewScreen = props => {

    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                title: title
            }
        })
    };

    return (
        <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    product={itemData.item}
                    onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                >
                    <Button color={Colors.primary}
                            title={"view Details"}
                            onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}/>
                    <Button color={Colors.primary}
                            title={"To Cart"}
                            onPress={() => {
                                dispatch(cartActions.addToCart(itemData.item))
                            }}/>
                </ProductItem>}
        />
    )
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='Menu'
                      iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                      onPress={() => {
                          navData.navigation.toggleDrawer();
                      }}/>
            </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title='cart'
                      iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                      onPress={() => {
                          navData.navigation.navigate('Cart')
                      }}/>
            </HeaderButtons>
    }
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;