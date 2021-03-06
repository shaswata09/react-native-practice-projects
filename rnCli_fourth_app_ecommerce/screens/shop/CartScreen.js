import React, { useState } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux';

import Colors from "../../constants/Color/Colors";
import CartItem from '../../components/shop/CartItem';
import * as CartActions from '../../store/actions/cart';
import * as OrderAcrtions from '../../store/actions/orders'
import Card from '../../components/UI/Card';


const CartScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

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
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });

    const dispatch = useDispatch();
    const sendOrderHandler = async () => {
        setIsLoading(true);
        dispatch(
            OrderAcrtions.addOrder(cartItems, cartTotalAmount)
        ).then(() => {
            setIsLoading(false);
            Alert.alert("Order successfully placed :)", error, [{ text: 'Okay' }]);
            props.navigation.goBack();
        }).catch((err) => {
            setIsLoading(false);
            setError(err)
        });
    };

    let finalCartAmount = cartTotalAmount.toFixed(2)

    return (
        <View style={styles.screenContainer}>
            <Card style={styles.summaryContainer}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.totalAmountText}>₹ {finalCartAmount}</Text>
                </Text>
                {isLoading ?
                    (<ActivityIndicator
                        size='small' color={Colors.Primary}
                    />)
                    :
                    (error ?
                        Alert.alert("Error occured!", error, [{ text: 'Okay' }])
                        :
                        <Button
                            color={Colors.Secondary}
                            style={styles.checkoutButton}
                            title="Checkout"
                            disabled={cartItems.length === 0}
                            onPress={sendOrderHandler}
                        />)
                }
            </Card>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => {
                            dispatch(CartActions.removeFromCart(itemData.item.productId));
                        }}
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
