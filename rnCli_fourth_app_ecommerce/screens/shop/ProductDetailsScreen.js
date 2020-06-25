import React from "react";
import { View, StyleSheet, Text, Button, Image } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from "react-native-gesture-handler";

import * as CartActions from '../../store/actions/cart';
import Colors from "../../constants/Color/Colors";


const ProductDetailsScreen = (props) => {

    const productID = props.route.params.productId;
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productID)
    );
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: selectedProduct.imageURL }} />
            </View>
            <View style={styles.actionContainer}>
                <Button 
                    color={Colors.Primary} 
                    style={styles.addToCartButton} 
                    title='Add to Cart'
                    onPress={() => {
                        dispatch(CartActions.addToCart(selectedProduct));
                    }}
                />
            </View>
            <Text style={styles.priceText}>₹{selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.descriptionText}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        padding: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
    },
    actionContainer: {
        marginVertical: 15,
        alignItems: 'center',
    },
    addToCartButton: {
    },
    priceText: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'OpenSans-Bold',
    },
    descriptionText: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 15,
        fontFamily: 'OpenSans-Regular',
    },
});

export default ProductDetailsScreen;
