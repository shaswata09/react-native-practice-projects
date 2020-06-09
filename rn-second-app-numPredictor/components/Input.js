import React from "react";
import { View, StyleSheet, TextInput } from "react-native";

const Input = (props) => {
    return (
        <View style={styles.numTextInputView}>
            <TextInput
                {...props}
                style={{ ...styles.numTextInput, ...props.style }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    numTextInputView: {
        padding: 10,
        alignItems: "center",
    },
    numTextInput: {
        borderColor: "grey",
        borderWidth: 1,
        padding: 5,
        borderRadius: 7,
        textAlign: "center",
        minWidth: 50,
        maxWidth: "75%",
    },
});

export default Input;
