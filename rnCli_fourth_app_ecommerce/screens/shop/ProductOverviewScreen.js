import React from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';


const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList
            data={products}
            renderItem={itemData => {
                return (
                    <ProductItem 
                        title={itemData.item.title}
                        price={itemData.item.price}
                        imageURL={itemData.item.imageURL}
                    />
                );
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default ProductOverviewScreen;
