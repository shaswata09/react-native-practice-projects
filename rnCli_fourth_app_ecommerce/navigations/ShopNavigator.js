import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Colors from '../constants/Color/Colors'

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';

import CustomHeaderButton from '../components/UI/CustomHeaderButton';

const ProductsNavigator = createStackNavigator();

function MyProductStack() {
    return (
        <ProductsNavigator.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.Primary,
            },
            headerTitleStyle: {
                fontFamily: 'OpenSans-Bold',
            },
            headerBackTitleStyle: {
                fontFamily: 'OpenSans-Regular',
            },
            headerTintColor: 'white',
        }}>
            <ProductsNavigator.Screen
                name="ProductOverview"
                component={ProductOverviewScreen}
                options={({ navigation }) => ({
                    title: 'Product Overview',
                    headerRight: () => {
                        return (
                            < CustomHeaderButton
                                name='shopping-cart'
                                type='font-awesome'
                                onPress={() => navigation.navigate('Cart',)}
                            />
                        );
                    },
                })}
            />
            <ProductsNavigator.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={({ navigation, route }) => ({
                    title: route.params.productTitle,
                    headerRight: () => {
                        return (
                            < CustomHeaderButton
                                name='shopping-cart'
                                type='font-awesome'
                                onPress={() => navigation.navigate('Cart',)}
                            />
                        );
                    },
                })}
            />
            <ProductsNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={{ title: 'Cart' }}
            />
        </ProductsNavigator.Navigator >
    );
}

export default () => {
    return (
        <NavigationContainer>
            <MyProductStack />
        </NavigationContainer>
    );
};