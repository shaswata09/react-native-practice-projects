import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Color from "../constants/Colors";

const PrimaryButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={{ ...styles.buttonView, ...props.style }}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonView: {
        backgroundColor: Color.primary,
        padding: 20,
        margin: 10,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        width: 150,
        height: 150,
        overflow: "hidden",
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "open-sans-bold",
        textAlign: "center",
    },
});

export default PrimaryButton;
