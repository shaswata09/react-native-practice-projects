import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
    return Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
};

export default function App() {
    const [userNumber, srtUserNumber] = useState();
    const [roundCount, setRoundCount] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);
    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => {
                    setDataLoaded(true);
                }}
                onError={(error) => {
                    console.log(error);
                }}
            />
        );
    }

    const startGameHandler = (selectedNumber) => {
        srtUserNumber(selectedNumber);
        setRoundCount(0);
    };

    const gameOverHandler = (roundCount) => {
        setRoundCount(roundCount);
    };

    const restartGameHandler = () => {
        srtUserNumber(null);
        setRoundCount(0);
    };

    let activeScreen = <StartGameScreen onStartGame={startGameHandler} />;

    if (userNumber && roundCount <= 0) {
        activeScreen = (
            <GameScreen userChoise={userNumber} onGameOver={gameOverHandler} />
        );
    } else if (roundCount > 0) {
        activeScreen = (
            <GameOverScreen
                totalRounds={roundCount}
                userNumber={userNumber}
                onRestart={restartGameHandler}
            />
        );
    }

    return (
        <View style={styles.screen}>
            <Header title="Number Predictor" />
            {activeScreen}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});
