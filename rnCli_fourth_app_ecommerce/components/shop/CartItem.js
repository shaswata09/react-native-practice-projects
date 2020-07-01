import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Icon } from 'react-native-elements';

import Colors from '../../constants/Color/Colors';

const CartItem = (props) => {
    return (
        <View style={styles.cartItemContainer}>
            <Text style={styles.itemData}>
                <Text style={styles.quatity}> {props.quantity} </Text>
                <Text style={styles.mainText}> {props.title} </Text>
            </Text>
            <View style={styles.itemData}>
                <Text style={styles.mainText}>{props.amount.toFixed(2)}</Text>
                {props.deletable && 
                <View style={styles.deleteButton}>
                    <Icon
                        {...props}
                        color={Colors.Primary}
                        size={23}
                        name='trash'
                        type='font-awesome'
                        onPress={() => props.onRemove()}
                    />
                </View>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItemContainer: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quatity: {
        fontFamily: 'OpenSans-Regular',
        color: '#888',
        fontSize: 16,
    },
    mainText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 16,
    },
    deleteButton: {
        marginLeft: 20,
    },
});

export default CartItem;
