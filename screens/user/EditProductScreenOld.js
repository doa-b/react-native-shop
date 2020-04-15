import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {StyleSheet, View, Text, TextInput, ScrollView, Platform, Alert} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import HeaderButton from "../../components/ui/HeaderButton";
import * as productActions from '../../store/actions/products';

/**
 * Created by Doa on 6-4-2020.
 */
const EditProductScreen = props => {

    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId));

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [titleIsValid, setTitleIsValid] = useState(false);
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        if (!titleIsValid) {
            Alert.alert(
                'Wrong input!',
                'Please check the errors in the form.',
                [{text: 'OK'}]);
            return};
        if (editedProduct) {
            // updating
            dispatch(productActions.updateProduct(
                prodId, title, description, imageUrl,
            ))
        } else {
            // creating new product
            dispatch(productActions.createProduct(
                title, description, imageUrl, +price
            ))
        }
        props.navigation.goBack();
    }, [dispatch, prodId, title, description, imageUrl, price, titleIsValid]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler]);

    const titleChangeHandler = text => {
        if (text.trim().length === 0) {
            setTitleIsValid(false)
        } else setTitleIsValid(true);
        setTitle(text);
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input}
                               value={title}
                               onChangeText={titleChangeHandler}
                               keyboardType='default'
                               autoCapitalize='sentences'
                               autoCorrect={false}
                               onEndEditing={() => {
                                   console.log('ending')
                               }}
                    />
                    {!titleIsValid && <Text>Please enter a valid title!</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input}
                               value={imageUrl}
                               onChangeText={setImageUrl}/>
                </View>
                {editedProduct ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput style={styles.input}
                                   value={price}
                                   onChangeText={setPrice}
                                   keyboardType='decimal-pad'
                                   returnKeyType='next'
                                   onSubmitEditing={() => {
                                       console.log('onSubmitEditing')
                                   }}
                        />
                    </View>
                )}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description}
                               onChangeText={setDescription}/>
                </View>
            </View>
        </ScrollView>
    )
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit');
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add Product',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item title="Save"
                      iconName={Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'}
                      onPress={submitFn}/>
            </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;