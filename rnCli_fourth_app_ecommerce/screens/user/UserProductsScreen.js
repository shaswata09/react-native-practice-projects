import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import Colors from "../../constants/Color/Colors";
import * as ProductActions from '../../store/actions/products';

const UserProductsScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert("An error occured!", error, [{ text: 'Okay' }]);
        }
    }, [error]);

    const editProductHandler = (id, title) => {
        props.navigation.navigate('EditUserProduct', {
            productId: id,
            productTitle: title,
        })
    };

    const deleteProductHandler = (id) => {
        setError(null);
        Alert.alert("Are you sure?", "Do you really want to delete this item?", [
            { text: "No", style: "default" },
            {
                text: "Yes", style: "destructive", onPress: () => {
                    setIsLoading(true);
                    dispatch(
                        ProductActions.deleteProduct(id)
                    ).then(() => {
                        setIsLoading(false);
                    }).catch((err) => {
                        setIsLoading(false);
                        setError(err.message);
                    });
                }
            }
        ])
    };

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.Primary} />
            </View>
        );
    } else {
        if (userProducts.length === 0) {
            return (
                <View  style={styles.centered}>
                    <Text>No Products found, maybe start creating some?</Text>
                </View>
            );
        }
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
    }
};

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UserProductsScreen;
