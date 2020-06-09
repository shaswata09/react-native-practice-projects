import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Color from "../constants/Color";

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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: "center"
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        textAlign: "center"
    },
});

export default PrimaryButton;
