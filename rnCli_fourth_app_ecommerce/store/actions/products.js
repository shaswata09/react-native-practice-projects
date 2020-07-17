import Product from '../../models/product.js';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch(
                'https://rn-practice-ecommerce.firebaseio.com/products.json'
            );
            const resData = await response.json();
            // console.log(resData);
            const loadedProducts = [];
            for (const key in resData) {
                loadedProducts.push(new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price)
                );
            }

            dispatch({
                type: SET_PRODUCT,
                products: loadedProducts
            });
        } catch (err) {
            // send some analytics or crashlytics event here later
            console.log("Error occured while fetching data from firebase.---", err.message);
            throw err;
        }
    }
};

export const deleteProduct = productId => {
    return async dispatch => {
        try {
            const response = await fetch(`https://rn-practice-ecommerce.firebaseio.com/products/${productId}.json`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error("Error occured! Response code: " + response.status);
            }

            dispatch({
                type: DELETE_PRODUCT,
                pId: productId
            });
        } catch (err) {
            console.log("Error occured while deleting data at firebase.---", err.message);
            throw err;
        }
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
        try {
            const response = await fetch('https://rn-practice-ecommerce.firebaseio.com/products.json', {
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
            // console.log(resData);

            dispatch({
                type: CREATE_PRODUCT,
                productData: {
                    id: resData.name,
                    title,
                    description,
                    imageUrl,
                    price,
                }
            });
        } catch (err) {
            console.log("Error occured while creating data at firebase.---", err.message);
            throw err;
        }
    }
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://rn-practice-ecommerce.firebaseio.com/products/${id}.json`, {
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
                throw new Error("Error occured! Response code: " + response.status);
            }

            dispatch({
                type: UPDATE_PRODUCT,
                pId: id,
                productData: {
                    title,
                    description,
                    imageUrl,
                }
            });
        } catch (err) {
            console.log("Error occured while updating data at firebase.---", err.message);
            throw err;
        }
    }
};