import Product from "../../models/product";
import PRODUCTS from "../../data/dummy-data";
import {firebaseUrl} from "../../kluisje";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const saveDummyData = () => {
    return dispatch => {
        PRODUCTS.map(product => {
            console.log('creating products');
            return dispatch(createProduct(
                product.title,
                product.description,
                product.imageUrl,
                product.price
            ))
        })
    }
};


export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(firebaseUrl + `/products.json`);

            // to handle 400 & 500 status codes which not throw an error
            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();
            const loadedProducts = [];
            for (const key in resData) {
                loadedProducts.push(new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price,
                ));
            }
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts
            })
        } catch (err) {
            // send error to analytics server
            throw err;
        }
    }
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        // any async code you want!
        const response = await fetch(firebaseUrl + `/products.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });

        const resData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price
            }
        })
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        const response = await fetch(firebaseUrl + `/products/${id}.json`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
            })
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }
        dispatch({
                type: UPDATE_PRODUCT,
                pid: id,
                productData: {
                    title,
                    description,
                    imageUrl,
                }
            }
        )

    }
};

export const deleteProduct = productId => {
    return async dispatch => {
        const response = await fetch(firebaseUrl + `/products/${productId}.json`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        dispatch (
            {
                type: DELETE_PRODUCT,
                pid: productId
            }
        )
    };
};