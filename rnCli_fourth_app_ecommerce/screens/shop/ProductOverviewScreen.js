import React from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as CartActions from '../../store/actions/cart';
import ProductItem from '../../components/shop/ProductItem';


const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return (
        <FlatList
            data={products}
            renderItem={itemData => {
                return (
                    <ProductItem
                        title={itemData.item.title}
                        price={itemData.item.price}
                        imageURL={itemData.item.imageURL}
                        onViewDetails={() => {
                            props.navigation.navigate('ProductDetails', { 
                                productId: itemData.item.id,
                                productTitle: itemData.item.title,
                            });
                        }}
                        onAddToCart={() => {
                            dispatch(CartActions.addToCart(itemData.item));
                        }}

                    />
                );
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default ProductOverviewScreen;
