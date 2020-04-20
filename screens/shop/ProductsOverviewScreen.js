import React, {useEffect, useState, useCallback} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {StyleSheet, FlatList, Platform, Button, View, ActivityIndicator, Text} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products'
import HeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../constants/Colors";
import PRODUCTS from "../../data/dummy-data";

/**
 * Created by Doa on 6-4-2020.
 */
const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isRefreshing, setIsRefreshing] = useState(false);
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const selectItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                title: title
            }
        });
    };

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fetchProducts());
        } catch (err) {
            setError(err.message)
        }
        setIsRefreshing(false)
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
        setIsLoading(true);
        loadProducts().then(
            () => setIsLoading(false)
        );
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
    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Button title="save dummy data"
                        onPress={() => dispatch(productsActions.saveDummyData())}/>
                <Text>No products found. Maybe start adding some! or Load dummy data</Text>
            </View>
        )
    }

    return (
        <FlatList
            onRefresh={loadProducts}
            refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    product={itemData.item}
                    onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
                >
                    <Button color={Colors.primary}
                            title="view Details"
                            onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}/>
                    <Button color={Colors.primary}
                            title="To Cart"
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverviewScreen;