import React from 'react';
import { StyleSheet, FlatList, View, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as CartActions from '../../store/actions/cart';
import ProductItem from '../../components/shop/ProductItem';
import Colors from "../../constants/Color/Colors";



const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const onItemSelectHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title,
        });
    }

    return (
        <FlatList
            data={products}
            renderItem={itemData => {
                return (
                    <ProductItem
                        title={itemData.item.title}
                        price={itemData.item.price}
                        imageURL={itemData.item.imageURL}
                        onSelect={() => {
                            onItemSelectHandler(itemData.item.id, itemData.item.title)
                        }}
                    >
                        <View style={styles.actions}>
                            <Button color={Colors.Primary} title='Details'
                                onPress={() => {
                                    onItemSelectHandler(itemData.item.id, itemData.item.title)
                                }}
                            />
                            <Button color={Colors.Primary} title='Add to Cart'
                                onPress={() => {
                                    dispatch(CartActions.addToCart(itemData.item));
                                }}
                            />
                        </View>
                    </ProductItem>
                );
            }}
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

export default ProductOverviewScreen;
