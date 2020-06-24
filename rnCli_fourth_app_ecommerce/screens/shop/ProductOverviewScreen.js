import React from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    return (
        <FlatList
            data={products}
            renderItem={itemData => {
                return (
                    <Text>{itemData.item.title}</Text>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({});

export default ProductOverviewScreen;
