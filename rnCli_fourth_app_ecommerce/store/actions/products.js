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
        await fetch(`https://rn-practice-ecommerce.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE',
        });

        dispatch({ 
            type: DELETE_PRODUCT,
            pId: productId 
        });
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
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
    }
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async dispatch => {
        await fetch(`https://rn-practice-ecommerce.firebaseio.com/products/${id}.json`, {
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

        dispatch({
            type: UPDATE_PRODUCT,
            pId: id,
            productData: {
                title,
                description,
                imageUrl,
            }
        });
    }
};