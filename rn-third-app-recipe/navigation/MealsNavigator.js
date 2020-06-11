import { Platform } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createAppContainer } from "react-navigation";
import {} from "react-navigation";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailsScreen from "../screens/MealDetailsScreen";
import FavouritesScreen from "../screens/FavouritesScreen";

import Colors from "../constants/Colors";

const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
            navigationOptions: {
                headerTitle: "Meal Categories",
            },
        },
        CategoryMeals: {
            screen: CategoryMealsScreen,
        },
        MealDetails: {
            screen: MealDetailsScreen,
        },
    },
    {
        // initialRouteName: "Categories",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor:
                    Platform.OS === "android" ? Colors.primaryColor : "white",
            },
            headerTintColor:
                Platform.OS === "android" ? "black" : Colors.primaryColor,
            headerTitle: "A Screen",
        },
    }
);

const MealNavigation = createBottomTabNavigator({
    Meals: MealsNavigator,
    Favpurites: FavouritesScreen,
});

// const Drawers = () => {
//     const Drawers = createBottomTabNavigator();
//     return (
//         <Drawers.Navigator initialRouteName="Meals">
//             <Drawer.Screen name="Meals" component={MealsNavigator} />
//             <Drawer.Screen name="Favourites" component={FavouritesScreen} />
//         </Drawers.Navigator>
//     );
// };

export default createAppContainer(MealsNavigator);
