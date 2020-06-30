import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from '../actions/orders';
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

        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.productID];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if (currentQty > 1){
                // need to reduce the item quantity by 1
                const updatedCartItem = new CartItem (
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems = {...state.items, [action.productID]: updatedCartItem};
            } else {
                updatedCartItems = {...state.items};
                delete updatedCartItems[action.productID];
            }
            return {...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            };

        case ADD_ORDER:
            return initialState;
    }
    return state;
};