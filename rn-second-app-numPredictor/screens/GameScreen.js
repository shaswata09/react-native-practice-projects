import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import Color from "../constants/Color";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import PrimaryButton from "../components/PrimaryButton";

const generateRandomNumberBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randNum = Math.floor(Math.random() * (max - min)) + min;
    if (randNum === exclude) {
        return generateRandomNumberBetween(min, max, exclude);
    } else {
        return randNum;
    }
};

const GameScreen = (props) => {
    const initialGuess = generateRandomNumberBetween(1, 100, userChoise);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);

    const { userChoise, onGameOver } = props;
    const [roundCount, setRoundCount] = useState(1);

    const [pastGuesses, setPastGuesses] = useState([
        { key: roundCount, value: initialGuess },
    ]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler = (direction) => {
        setRoundCount(roundCount + 1);
        if (
            (direction === "lower" && currentGuess < userChoise) ||
            (direction === "higher" && currentGuess > userChoise)
        ) {
            Alert.alert("Don't lie!", "You know that is wrong...", [
                {
                    text: "Sorry",
                    style: "cancel",
                },
            ]);
            return;
        }
        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextGuess = generateRandomNumberBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextGuess);
        setPastGuesses((prevGuess) => [
            { key: roundCount + 1, value: nextGuess },
            ...prevGuess,
        ]);
    };

    useEffect(() => {
        if (currentGuess === userChoise) {
            onGameOver(roundCount);
        }
    }, [currentGuess, userChoise, onGameOver]);

    return (
        <View style={styles.screen}>
            <TitleText style={styles.gameScreenTitleText}>
                Opponents Guess:
            </TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <View style={styles.button}>
                    <PrimaryButton
                        onPress={nextGuessHandler.bind(this, "lower")}
                        style={styles.lowerButton}
                    >
                        <Ionicons name="md-remove" size={25} color="white" />
                    </PrimaryButton>
                </View>
                <View>
                    <BodyText>Round:</BodyText>
                    <NumberContainer style={styles.roundCountNumContainer}>
                        {roundCount}
                    </NumberContainer>
                </View>
                <View style={styles.button}>
                    <PrimaryButton
                        onPress={nextGuessHandler.bind(this, "higher")}
                        style={styles.higherButton}
                    >
                        <Ionicons name="md-add" size={25} color="white" />
                    </PrimaryButton>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess) => (
                        <View key={guess.key} style={styles.prevGuessView}>
                            <Text style={styles.prevGuessText}>
                                #{guess.key}
                            </Text>
                            <Text style={styles.prevGuessText}>
                                {guess.value}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 20,
        width: "80%",
    },
    button: {
        width: "33%",
    },
    roundCountNumContainer: {
        marginVertical: 20,
    },
    gameScreenTitleText: {
        marginVertical: 15,
        marginHorizontal: 10,
    },
    lowerButton: {
        backgroundColor: "coral",
    },
    higherButton: {
        backgroundColor: "indianred",
    },
    listContainer: {
        flex: 1,
        width: "80%",
    },
    list: {
        alignItems: "center",
    },
    prevGuessView: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        borderWidth: 2,
        borderColor: Color.secondary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 10,
    },
    prevGuessText: {
        padding: 5,
        marginHorizontal: 25,
        fontSize: 15,
    },
});

export default GameScreen;
