import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Color from "../constants/Color";

const NumberContainer = (props) => {
    return (
        <View style={{...styles.numContainerView, ...props.style}}>
            <Text style={styles.number}>{props.children}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    numContainerView: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: Color.secondary,
        borderWidth: 2,
        borderRadius: 7,
        marginVertical: 10,
    },
    number: {
        color: Color.secondary,
        fontSize: 30,
    },
});

export default NumberContainer;
