import React, { useState, useCallback } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../constants/Color/Colors';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import AuthScreen from '../screens/user/AuthScreen';

import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import { Icon } from 'react-native-elements';

const ProductsNavigator = createStackNavigator();
const OrdersNavigator = createStackNavigator();
const UserProductsNavigator = createStackNavigator();
const ShopDrawerNavigator = createDrawerNavigator();
const AuthStackNavigator = createStackNavigator();


function MainSwitchNavigator() {
    const isAuthToken = useSelector(state => state.auth.isAuthToken);

    if (isAuthToken) {
        return <ShopDrawer />;
    } else {
        return <MyAuthStack />;
    }
}

function MyAuthStack() {
    return (
        <AuthStackNavigator.Navigator screenOptions={{
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
            <AuthStackNavigator.Screen
                name="AuthScreen"
                component={AuthScreen}
                options={({ navigation }) => ({
                    title: 'Authenticate',
                    headerTitleAlign: 'center'
                })}
            />
        </AuthStackNavigator.Navigator>
    );
}

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
                    headerLeft: () => {
                        return (
                            < CustomHeaderButton
                                name='bars'
                                type='font-awesome'
                                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
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
                    headerLeft: () => {
                        return (
                            < CustomHeaderButton
                                name='bars'
                                type='font-awesome'
                                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                            />
                        );
                    },
                })}
            />
            <ProductsNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={({ navigation }) => ({
                    title: 'Cart',
                    headerLeft: () => {
                        return (
                            < CustomHeaderButton
                                name='bars'
                                type='font-awesome'
                                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                            />
                        );
                    },
                })}
            />
        </ProductsNavigator.Navigator >
    );
}

function MyOrdersStack() {
    return (
        <OrdersNavigator.Navigator
            screenOptions={{
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
            }}
        >
            <OrdersNavigator.Screen
                name="Orders"
                component={OrdersScreen}
                options={({ navigation }) => ({
                    title: 'Your Orders',
                    headerRight: () => {
                        return (
                            < CustomHeaderButton
                                name='shopping-cart'
                                type='font-awesome'
                                onPress={() => navigation.navigate('Cart',)}
                            />
                        );
                    },
                    headerLeft: () => {
                        return (
                            < CustomHeaderButton
                                name='bars'
                                type='font-awesome'
                                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                            />
                        );
                    },
                })}
            />
        </OrdersNavigator.Navigator>
    );
}

function MyUserProductsStack() {
    return (
        <UserProductsNavigator.Navigator
            screenOptions={{
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
            }}
        >
            <UserProductsNavigator.Screen
                name="UserProducts"
                component={UserProductsScreen}
                options={({ navigation, route }) => ({
                    title: 'Your Products',
                    headerLeft: () => {
                        return (
                            < CustomHeaderButton
                                name='bars'
                                type='font-awesome'
                                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                            />
                        );
                    },
                    headerRight: () => {
                        return (
                            < CustomHeaderButton
                                name='plus'
                                type='font-awesome'
                                onPress={() => navigation.navigate('EditUserProduct', {})}
                            />
                        );
                    },
                })}
            />
            <UserProductsNavigator.Screen
                name="EditUserProduct"
                component={EditProductScreen}
                options={({ navigation, route }) => ({
                    title: route.params.productTitle ?
                        "Edit " + route.params.productTitle :
                        "Add Product",
                    headerRight: () => {
                        return (
                            < CustomHeaderButton
                                name='save'
                                type='font-awesome'
                                onPress={route.params.submit}
                            />
                        );
                    },
                })}
            />
        </UserProductsNavigator.Navigator>
    );
}

function ShopDrawer() {
    return (
        <ShopDrawerNavigator.Navigator
            initialRouteName="Products"
            drawerPosition='left'
            drawerType='back'
        >
            <ShopDrawerNavigator.Screen
                name="Products"
                component={MyProductStack}
                options={{
                    drawerIcon: () => <Icon
                        name='cart'
                        type='evilicon'
                        color='#517fa4'
                        size={30}
                    />
                }}
            />
            <ShopDrawerNavigator.Screen
                name="Orders"
                component={MyOrdersStack}
                options={{
                    drawerIcon: () => <Icon
                        name='tag'
                        type='evilicon'
                        color='#517fa4'
                        size={30}
                    />
                }}
            />
            <ShopDrawerNavigator.Screen
                name="Admin"
                component={MyUserProductsStack}
                options={{
                    drawerIcon: () => <Icon
                        name='eye'
                        type='evilicon'
                        color='#517fa4'
                        size={30}
                    />
                }}
            />
        </ShopDrawerNavigator.Navigator>
    );
}

export default () => {
    return (
        <NavigationContainer>
            <MainSwitchNavigator />
        </NavigationContainer>
    );
};