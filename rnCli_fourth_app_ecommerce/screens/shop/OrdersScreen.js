import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.order.orders);

    return (
        <FlatList 
            data={orders}
            keyExtractor={item => item.id}
            renderItem={ itemData => 
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            }
        />
    );
};

const styles = StyleSheet.create({});

export default OrdersScreen;
