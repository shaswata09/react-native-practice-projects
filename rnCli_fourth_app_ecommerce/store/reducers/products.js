import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCT
} from '../actions/products';
import Product from '../../models/product.js';

const initialState = {
  availableProducts: [],
  userProducts: [],
  isNoProduct: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.userProducts,
        isNoProduct: action.isNoProduct,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.pId
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.pId
        ),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pId
      );
      const updateProduct = new Product(
        action.pId,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price,
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updateProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pId
      );
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updateProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
  }

  return state;
};
