import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => 
                <ProductItem
                    title={itemData.item.title}
                    price={itemData.item.price}
                    imageURL={itemData.item.imageURL}
                    onViewDetails={() => { }}
                    onAddToCart={() => { }}
                />
            }
        />
    );
};

const styles = StyleSheet.create({});

export default UserProductsScreen;
