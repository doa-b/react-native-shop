import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {StyleSheet, View, FlatList, Platform, Button, Alert} from 'react-native';

import ProductItem from "../../components/shop/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../components/ui/HeaderButton";
import Colors from "../../constants/Colors";
import * as productActions from "../../store/actions/products";


/**
 * Created by Doa on 6-4-2020.
 */
const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id) => {
        props.navigation.navigate('EditProduct', {productId: id});
    };

    const deleteHandler = (id) => {
        Alert.alert(
            'Ary you sure?',
            'Do you really want to deltete this item?',
            [{text: 'Nope', style: 'default'},
                {text: 'Yes', style: 'destructive',
                    onPress: () => {dispatch(productActions.deleteProduct(id))}}]
        )
    };

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    product={itemData.item}
                    onSelect={() => editProductHandler(itemData.item.id)}
                >
                    <Button color={Colors.primary}
                            title={"Edit"}
                            onPress={() => editProductHandler(itemData.item.id)}/>
                    <Button color={Colors.primary}
                            title={"Delete"}
                            onPress={() => {
                                deleteHandler(itemData.item.id)
                            }}/>
                </ProductItem>
            }
        >
        </FlatList>
    )
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
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
                <Item title='Add'
                      iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                      onPress={() => {
                          navData.navigation.navigate('EditProduct');
                      }}/>
            </HeaderButtons>
    }
};

const styles = StyleSheet.create({});

export default UserProductsScreen;