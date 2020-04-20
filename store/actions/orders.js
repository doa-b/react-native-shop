import {firebaseUrl} from "../../kluisje";
import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';

export const addOrder = (cartItems, totalAmount) => {
    const currentUser = 'u1';
    const date = new Date();
    return async dispatch => {
        const response = await fetch(firebaseUrl + `/orders/${currentUser}.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        })

    }
};

export const fetchOrders = (userId = 'u1') => {
    return async dispatch => {
        try {
            const response = await fetch(firebaseUrl + `/orders/${userId}.json`);

            // to handle 400 & 500 status codes which not throw an error
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedOrders = [];
            for (const key in resData) {
                loadedOrders.push(new Order(
                    key,
                    resData[key].cartItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ));
            }
            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders
            });
        } catch (err) {
            throw err;
        }
    }
};