import { ADD_TO_CART } from "../actions/cart";
import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.Product;
            const productPrice = addedProduct.price;
            const productTitile = addedProduct.title;
            let updatedOrNewCartItem;
            if (state.items[addedProduct.id]) {
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productPrice, 
                    productTitile, 
                    state.items[addedProduct.id].sum + productPrice
                );
            } else {
                updatedOrNewCartItem = new CartItem(
                    1, 
                    productPrice, 
                    productTitile, 
                    productPrice
                );                
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + productPrice
            };
    }
    return state;
};