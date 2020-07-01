import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Colors from '../constants/Color/Colors';

import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

import CustomHeaderButton from '../components/UI/CustomHeaderButton';
import { Icon } from 'react-native-elements';

const ProductsNavigator = createStackNavigator();
const OrdersNavigator = createStackNavigator();
const userProductsNavigator = createStackNavigator();
const ShopDrawerNavigator = createDrawerNavigator();


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
                options={({navigation})=> ({
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
            drawerToggleIconContainer
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
        <userProductsNavigator.Navigator 
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
            drawerToggleIconContainer
        >
            <userProductsNavigator.Screen
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
                                onPress={() => navigation.navigate('EditUserProduct', {
                                    
                                })}
                            />
                        );
                    },                      
                })}
            />
            <userProductsNavigator.Screen
                name="EditUserProduct"
                component={EditProductScreen}
                options={({ navigation, route }) => ({
                    title: "Edit "+route.params.productTitle,        
                })}
            />
        </userProductsNavigator.Navigator>
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
            <ShopDrawer />
        </NavigationContainer>
    );
};