import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import Color from "../constants/Color";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import PrimaryButton from "../components/PrimaryButton";

const StartGameScreen = (props) => {
    const [numericInputValue, setNumericInputValue] = useState("");
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const [numValueSubmitState, setNumValueSubmitState] = useState(false);
    const [submittedNumericValue, setSubmittedNumericValue] = useState();

    const numInputHandler = (numericInputValue) => {
        setNumericInputValue(numericInputValue.replace(/[^0-9]/g, ""));
        const inputNumValue = parseInt(numericInputValue);
        if (inputNumValue > 0 && inputNumValue <= 99) {
            setIsInputEmpty(false);
        } else {
            Alert.alert(
                "Invalid input!",
                "Please enter a number between 1 to 99.",
                [
                    {
                        text: "Okay",
                        style: "destructive",
                        onPress: resetInputButtonHandler,
                    },
                ]
            );
            setIsInputEmpty(true);
        }
    };

    const resetInputButtonHandler = () => {
        setIsInputEmpty(true);
        setNumValueSubmitState(false);
        setNumericInputValue("");
    };

    const submitInputButtonHandler = () => {
        setIsInputEmpty(true);
        const inputNumValue = parseInt(numericInputValue);
        if (isNaN(inputNumValue) || inputNumValue <= 0 || inputNumValue > 99) {
            setNumericInputValue("");
            return;
        }
        setNumValueSubmitState(true);
        console.log(inputNumValue);
        setSubmittedNumericValue(inputNumValue);
        setNumericInputValue("");
        Keyboard.dismiss();
    };

    let submittedOutput;
    if (numValueSubmitState) {
        submittedOutput = (
            <Card style={styles.afterSelectCard}>
                <View>
                    <BodyText>You entered:</BodyText>
                    <NumberContainer>{submittedNumericValue}</NumberContainer>
                </View>
                <View style={styles.startGameButtonView}>
                    <PrimaryButton
                        onPress={() => {
                            props.onStartGame(submittedNumericValue);
                        }}
                    >
                        Start Game
                    </PrimaryButton>
                </View>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={styles.screen}>
                <TitleText style={styles.startGameText}>
                    Start New Game :)
                </TitleText>
                <Card style={styles.inputCardView}>
                    <View style={styles.numSelectView}>
                        <BodyText style={styles.numSelectText}>
                            Enter a Number [1,99]:
                        </BodyText>
                    </View>
                    <Input
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={numInputHandler}
                        value={numericInputValue}
                    />
                    <View style={styles.buttonView}>
                        <View style={styles.buttonSection}>
                            <Button
                                title="RESET"
                                color={Color.secondary}
                                onPress={resetInputButtonHandler}
                            />
                        </View>
                        <View style={styles.buttonSection}>
                            <Button
                                title="CONFIRM"
                                color={Color.primary}
                                onPress={submitInputButtonHandler}
                                disabled={isInputEmpty}
                            />
                        </View>
                    </View>
                </Card>
                {submittedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    startGameText: {
        fontSize: 25,
        paddingVertical: 15,
        paddingHorizontal: 25,
        marginTop: 15,
    },
    numSelectView: {
        alignItems: "center",
        padding: 5,
    },
    numSelectText: {
        fontSize: 18,
        fontFamily: "open-sans",
    },
    inputCardView: {
        width: "80%",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15,
    },
    buttonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        width: "90%",
    },
    buttonSection: {
        width: "45%",
    },
    afterSelectCard: {
        padding: 10,
        margin: 10,
        marginTop: 20,
        alignItems: "center",
    },
    startGameButtonView: {
        padding: 10,
        marginHorizontal: 15,
        marginVertical: 5,
    },
});

export default StartGameScreen;
