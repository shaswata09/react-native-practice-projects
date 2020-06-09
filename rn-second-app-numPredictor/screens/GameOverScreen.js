import React from "react";
import { View, StyleSheet, Button, Image, Text } from "react-native";

import Card from "../components/Card";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import Color from "../constants/Color";
import PrimaryButton from "../components/PrimaryButton";

const GameOverScreen = (props) => {
    return (
        <View style={styles.screen}>
            <Card style={styles.gameOverStatsContainer}>
                <TitleText style={styles.gameOverHeadingText}>
                    Game Over!
                </TitleText>
                <View style={styles.imageContainer}>
                    <Image
                        fadeDuration={1000}
                        // source={require("../assets/success.png")}
                        source={{
                            uri:
                                "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80",
                        }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <BodyText style={styles.gameStatText}>
                    Rounds mobile taken:
                    <Text style={styles.numericValue}>
                        &nbsp;{props.totalRounds}
                    </Text>
                </BodyText>
                <BodyText style={styles.gameStatText}>
                    You Entered:&nbsp;
                    <Text style={styles.numericValue}>{props.userNumber}</Text>
                </BodyText>
                <View style={styles.restartGameButton}>
                    <PrimaryButton onPress={props.onRestart}>
                        RESTART
                    </PrimaryButton>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    gameOverStatsContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        marginVertical: 10,
    },
    gameOverHeadingText: {
        fontSize: 20,
    },
    gameStatText: {
        fontSize: 18,
    },
    restartGameButton: {
        padding: 15,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: 250,
        height: 250,
        borderColor: "grey",
        borderWidth: 3,
        borderRadius: 125,
        margin: 15,
        overflow: "hidden",
    },
    numericValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: Color.secondary,
    },
});

export default GameOverScreen;
