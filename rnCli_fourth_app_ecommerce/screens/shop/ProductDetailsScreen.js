import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from 'react-redux';


const ProductDetailsScreen = (props) => {

    const productID = props.route.params.productId;
    const selectedProduct = useSelector(state => 
        state.products.availableProducts.find(prod => prod.id === productID)
    );

    return (
        <View>
            <Text>Product ID: {productID} </Text>
            <Text>Product Title: {selectedProduct.title} </Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ProductDetailsScreen;
