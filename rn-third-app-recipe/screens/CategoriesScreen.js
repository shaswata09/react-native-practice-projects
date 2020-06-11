import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import { CATEGORIES } from "../data/dummy-Data";
// import CategoryGridTile from "../components/CategoryGridTile";
import PrimaryButton from "../components/PrimaryButton";

const CategoriesScreen = (props) => {
    const renderGridItem = (itemData) => {
        return (
            <PrimaryButton
                style={{ backgroundColor: itemData.item.color }}
                onPress={() => {
                    props.navigation.navigate({
                        routeName: "CategoryMeals",
                        params: {
                            categoryId: itemData.item.id,
                        },
                    });
                }}
            >
                {itemData.item.title}
            </PrimaryButton>
        );
    };

    return (
        <View style={styles.screen}>
            <FlatList
                data={CATEGORIES}
                renderItem={renderGridItem}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default CategoriesScreen;
