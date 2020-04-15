import React, {useEffect, useCallback, useReducer} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {StyleSheet, View, Platform, Alert, ScrollView, KeyboardAvoidingView} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";

import HeaderButton from "../../components/ui/HeaderButton";
import * as productActions from '../../store/actions/products';
import Input from "../../components/ui/Input";

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        // loop over all members in inputValidities
        for (const key in updatedValidities) {
            // if any input is invalid, updatedFormIsValid will be set to false and stay false
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            formIsValid: updatedFormIsValid
        }
    }
    return state;
};

/**
 * Created by Doa on 6-4-2020.
 */
const EditProductScreen = props => {

    const dispatch = useDispatch();
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId));

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            price: '',
            description: editedProduct ? editedProduct.description : '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            price: editedProduct ? true : false,
            description: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
    });

    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert(
                'Wrong input!',
                'Please check the errors in the form.',
                [{text: 'OK'}]);
            return
        }
        if (editedProduct) {
            // updating
            dispatch(productActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
            ))
        } else {
            // creating new product
            dispatch(productActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
            ))
        }
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})
    }, [submitHandler]);

    const inputChangedHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            input: inputIdentifier,
            value: inputValue,
            isValid: inputValidity
        })
    }, [dispatchFormState]);

    return (
        <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={(Platform.OS === 'android')? null : "padding"}
            keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        errorText='Please enter a valid title!'
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        onInputChanged={inputChangedHandler}
                        required
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                    />
                    <Input
                        id='imageUrl'
                        label='Image Url'
                        errorText='Please enter a valid image url!'
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        onInputChanged={inputChangedHandler}
                        required
                        keyboardType='default'
                        returnKeyType='next'
                    />
                    {!editedProduct &&
                    <Input
                        id='price'
                        label='Price'
                        errorText='Please enter a valid price!'
                        initialValue={editedProduct ? editedProduct.price : ''}
                        initiallyValid={!!editedProduct}
                        onInputChanged={inputChangedHandler}
                        required
                        min={0.1}
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                    />}
                    <Input
                        id='description'
                        label='Description'
                        errorText='Please enter a valid description!'
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        onInputChanged={inputChangedHandler}
                        required
                        minLength={5}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        multiline
                        numberOfLines={3}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    }
});

export default EditProductScreen;