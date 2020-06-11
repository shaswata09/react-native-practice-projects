import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

const MealItem = (props) => {
    return (
        <View style={styles.mealItem}>
            <TouchableOpacity activeOpacity={0.26} onPress={props.onPress}>
                <View>
                    <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
                        <ImageBackground
                            source={{ uri: props.image }}
                            style={styles.bgImage}
                        >
                            <View style={styles.titleContainer}>
                                <Text style={styles.title} numberOfLines={1}>
                                    {props.title}
                                </Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
                        <Text>{props.duration}m</Text>
                        <Text>{props.complexity.toUpperCase()}</Text>
                        <Text>{props.affordability.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mealItem: {
        flex: 1,
        margin: 10,
        height: 200,
        backgroundColor: "#dddddd",
        borderRadius: 10,
        overflow: "hidden",
    },
    mealRow: {
        flexDirection: "row",
    },
    mealHeader: {
        height: "85%",
    },
    mealDetails: {
        paddingHorizontal: 10,
        justifyContent: "space-between",
        alignItems: "center",
        height: "15%",
    },
    bgImage: {
        height: "100%",
        width: "100%",
        justifyContent: "flex-end",
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
        color: "white",
        textAlign: "center",
    },
    titleContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});

export default MealItem;
