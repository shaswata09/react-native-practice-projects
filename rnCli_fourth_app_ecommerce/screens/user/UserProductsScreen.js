import React from "react";
import { View, StyleSheet, Button, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import Colors from "../../constants/Color/Colors";
import * as ProductActions from '../../store/actions/products';

const UserProductsScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = (id, title) => {
        props.navigation.navigate('EditUserProduct', {
            productId: id,
            productTitle: title,
        })
    };

    const deleteProductHandler = (id) => {
        Alert.alert("Are you sure?", "Do you really want to delete this item?", [
            { text: "No", style: "default" },
            {
                text: "Yes", style: "destructive", onPress: () => {
                    dispatch(ProductActions.deleteProduct(id));
                }
            }
        ])
    };

    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <ProductItem
                    title={itemData.item.title}
                    price={itemData.item.price}
                    imageURL={itemData.item.imageURL}
                    onSelect={() => {
                        editProductHandler(itemData.item.id, itemData.item.title)
                    }}
                >
                    <View style={styles.actions}>
                        <Button color={Colors.Primary} title='Edit'
                            onPress={() => {
                                editProductHandler(itemData.item.id, itemData.item.title)
                            }}
                        />
                        <Button color={Colors.Primary} title='Delete'
                            onPress={deleteProductHandler.bind(this, itemData.item.id)}
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
