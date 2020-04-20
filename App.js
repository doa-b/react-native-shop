import React, {useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {StyleSheet, Text, View} from 'react-native';
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import {composeWithDevTools} from 'redux-devtools-extension';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigator from "./navigation/ShopNavigator";

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'), // chosen key names are free to choose
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

const rootReducer = combineReducers({
        products: productsReducer,
        cart: cartReducer,
        orders: ordersReducer
    }
);

//remove composeWithDevTools() when going to production
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

export default function App() {
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return <AppLoading
            startAsync={fetchFonts}
            onFinish={() => setDataLoaded(true)}
            onError={(error) => console.log(error)}/>
    }

    return (
        <Provider store={store}>
            <ShopNavigator/>
        </Provider>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
