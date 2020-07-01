import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import Colors from "../../constants/Color/Colors";

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
                    onSelect={() => { }}
                >
                    <View style={styles.actions}>
                        <Button color={Colors.Primary} title='Edit'
                            onPress={() => { }}
                        />
                        <Button color={Colors.Primary} title='Delete'
                            onPress={() => { }}
                        />
                    </View>
                </ProductItem>
            }
        />
    );
};

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 10,
    },
});

export default UserProductsScreen;
