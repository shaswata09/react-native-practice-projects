import React from "react";
import { StyleSheet, View, Text } from "react-native";

import Color from "../constants/Color";

const Header = (props) => {
    return (
        <View style={styles.headerView}>
            <Text style={styles.headerTitle}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerView: {
        width: "100%",
        height: 90,
        paddingTop: 45,
        backgroundColor: Color.primary,
        alignItems: "center",
    },
    headerTitle: {
        color: "black",
        fontSize: 20,
        fontFamily: "open-sans-bold",
    },
});

export default Header;
