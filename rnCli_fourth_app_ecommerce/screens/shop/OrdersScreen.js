import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Text, Button, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux';

import * as OrderActions from '../../store/actions/orders';
import OrderItem from '../../components/shop/OrderItem';
import Colors from "../../constants/Color/Colors";

const OrdersScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const orders = useSelector(state => state.order.orders);
    const dispatch = useDispatch();

    const loadOrders = useCallback(() => {
        setError(null);
        setIsLoading(true);
        dispatch(
            OrderActions.getOrders()
        ).then(() => {
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            setError(err)
        });
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'focus',
            loadOrders,
        );
        return () => {
            if (null === willFocusSub) {
                willFocusSub.remove();
            }
        };
    }, [loadOrders]);

    useEffect(() => {
        loadOrders();
    }, [dispatch, loadOrders]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.Primary} />
            </View>
        );
    } else if (error) {
        return (
            <View style={styles.centered}>
                <Text>Error Occured...</Text>
                <Text>{error.message}</Text>
                <Button title="Try again" onPress={loadOrders} color={Colors.Primary} />
            </View>
        );
    } else {
        if (orders.length === 0) {
            return (
                <View  style={styles.centered}>
                    <Text>No orders found, maybe start ordering some?</Text>
                </View>
            );
        }
        return (
            <FlatList
                data={orders}
                keyExtractor={item => item.id}
                renderItem={itemData =>
                    <OrderItem
                        amount={itemData.item.totalAmount}
                        date={itemData.item.readableDate}
                        items={itemData.item.items}
                    />
                }
            />
        );
    }
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OrdersScreen;
