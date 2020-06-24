import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Colors from '../constants/Color/Colors'
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';

const ProductsNavigator = createStackNavigator();

function MyProductStack() {
    return (
        <ProductsNavigator.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.Primary,
            },
            headerTintColor: 'white',
        }}>
            <ProductsNavigator.Screen
                name="ProductOverview"
                component={ProductOverviewScreen}
                options={{ title: 'Product Overview' }} />
        </ProductsNavigator.Navigator>
    );
}

export default () => {
    return (
        <NavigationContainer>
            <MyProductStack />
        </NavigationContainer>
    );
};