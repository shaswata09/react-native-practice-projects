import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text, Button, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as CartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import ProductItem from '../../components/shop/ProductItem';
import Colors from "../../constants/Color/Colors";


const ProductOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const isNoProduct = useSelector(state => state.products.isNoProduct);
    const dispatch = useDispatch();

    const refreshProducts = () => {
        setIsRefreshing(true);
        loadProducts();
    };

    const pageChangeLoadProduct = () => {
        setIsLoading(true);
        setError(null);
        loadProducts();
    };

    const loadProducts = useCallback(async () => {
        setError(null);
        await dispatch(
            productsActions.fetchProducts()
        ).then(() => {
            setIsLoading(false);
            setIsRefreshing(false);
        }).catch((err) => {
            setIsLoading(false);
            setIsRefreshing(false);
            setError(err);
        });
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener(
            'focus',
            pageChangeLoadProduct,
        );
        return () => {
            if (null === willFocusSub) {
                willFocusSub.remove();
            }
        };
    }, [loadProducts]);

    useEffect(() => {
        pageChangeLoadProduct();
    }, [dispatch, loadProducts]);

    const onItemSelectHandler = (id, title) => {
        props.navigation.navigate('ProductDetails', {
            productId: id,
            productTitle: title,
        });
    }

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
                <Button title="Try again" onPress={loadProducts} color={Colors.Primary} />
            </View>
        );
    } else if (!isLoading && isNoProduct) {
        return (
            <View style={styles.centered}>
                <Text>No Products found. Maybe start adding some.</Text>
                <Button title="Try again" onPress={loadProducts} color={Colors.Primary} />
            </View>
        );
    } else {
        return (
            <FlatList
                onRefresh={refreshProducts}
                refreshing={isRefreshing}
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
}

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

export default ProductOverviewScreen;
