import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useSelector } from 'react-redux';

import Colors from "../../constants/Color/Colors";

const CartScreen = (props) => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        let transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            });
        }
        return transformedCartItems;
    });

    return (
        <View style={styles.screenContainer}>
            <View style={styles.summaryContainer}>
                <Text style={styles.summaryText}>
                    Total:<Text style={styles.totalAmountText}>₹{cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button 
                    color={Colors.Secondary} 
                    style={styles.checkoutButton} 
                    title="Checkout"
                    disabled={cartItems.length === 0} />
            </View>
            <View style={styles.orderDetailsContainer}>
                <Text>Dummy view</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        margin: 20,
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18,
    },
    totalAmountText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 20,
        color: Colors.Primary,
    },
    checkoutButton: {},
    orderDetailsContainer: {},
});

export default CartScreen;
