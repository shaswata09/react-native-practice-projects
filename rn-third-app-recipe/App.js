import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import {useScreens, enableScreens} from "react-native-screens";

import MealsNavigator from "./navigation/MealsNavigator";

enableScreens();

const fetchFonts = () => {
    return Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
};

export default function App() {
    const [fontsLoaded, setFoantsLoaded] = useState(false);
    if (!fontsLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setFoantsLoaded(true)}
            />
        );
    }

    return <MealsNavigator />;
}

const styles = StyleSheet.create({});
