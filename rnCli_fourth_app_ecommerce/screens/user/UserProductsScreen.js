import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import Colors from "../../constants/Color/Colors";
import * as ProductActions from '../../store/actions/products';

const UserProductsScreen = (props) => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

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
                            onPress={() => {
                                dispatch(ProductActions.deleteProduct(itemData.item.id));
                            }}
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
