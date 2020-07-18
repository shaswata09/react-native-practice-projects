import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Button,
    KeyboardAvoidingView,
    StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Color/Colors';

const AuthScreen = props => {
    return (
        <KeyboardAvoidingView
            behavior='padding'
            keyboardVerticalOffset={10}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView >
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType='email-address'
                            required
                            email
                            autoCapitalize="none"
                            errorMessage="Please enter a valid e-mail address"
                            onInputChange={() => { }}
                            initialValue=''
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorMessage="Please enter a valid password"
                            onInputChange={() => { }}
                            initialValue=''
                        />
                        <View style={styles.buttonViewContainer}>
                            <Button title="Log In" color={Colors.Primary} />
                        </View>
                        <View style={styles.buttonViewContainer}>
                            <Button title="Sign Up" color={Colors.Secondary} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
    },
    buttonViewContainer: {
        marginTop: 10
    },
});

export default AuthScreen;