import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';

const OrdersScreen = (props) => {
    const orders = useSelector(state => state.order.orders);

    return (
        <FlatList 
            data={orders}
            keyExtractor={item => item.id}
            renderItem={ itemData => 
                <Text>{itemData.item.totalAmount}</Text>
            }
        />
    );
};

const styles = StyleSheet.create({});

export default OrdersScreen;
