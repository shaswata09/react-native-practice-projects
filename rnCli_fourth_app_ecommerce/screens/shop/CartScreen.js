import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';

import Colors from "../../constants/Color/Colors";
import CartItem from '../../components/shop/CartItem';

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
                    Total: <Text style={styles.totalAmountText}>₹ {cartTotalAmount.toFixed(2)}</Text>
                </Text>
                <Button
                    color={Colors.Secondary}
                    style={styles.checkoutButton}
                    title="Checkout"
                    disabled={cartItems.length === 0} />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => 
                <CartItem 
                    quantity={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    onRemove={() => {console.log('deleted')}}
                />}
            />
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
});

export default CartScreen;
