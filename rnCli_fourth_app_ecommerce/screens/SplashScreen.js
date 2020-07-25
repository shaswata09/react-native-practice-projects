import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import Color from '../constants/Color/Colors';
import * as AuthActions from '../store/actions/auth';

export const SplashScreen = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('AuthScreen');
                return;
            } else {
                const transformedData = JSON.parse(userData);
                const { token, userID, expirationTime } = transformedData;
                const expiryTime = new Date(expirationTime);

                if (expiryTime <= new Date() || !token || !userID) {
                    props.navigation.navigate('AuthScreen');
                    return;
                }

                const willExpireIn = expiryTime.getTime() - new Date().getTime();
                dispatch(AuthActions.authenticate(userID, token, willExpireIn));
            }
        };
        tryLogin();
    }, [dispatch]);


    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Color.Primary} />
            <Text style={styles.splashText}>Hold it tight!</Text>
            <Text style={{
                fontFamily: 'OpenSans-Regular',
                fontSize: 14
            }}>
                Awsomeness is getting loaded...
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    splashText: {
        marginTop: 10,
        fontSize: 14,
        fontFamily: 'OpenSans-Bold',
    }
});

export default SplashScreen;