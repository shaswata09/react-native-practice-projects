import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    View,
    Button,
    KeyboardAvoidingView,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Color/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedIsFormValid = true;
        for (const key in updatedValidities) {
            updatedIsFormValid = updatedIsFormValid && updatedValidities[key];
        }
        return {
            ...state,
            inputValues: updatedValues,
            inputValidities: updatedValidities,
            isFormValid: updatedIsFormValid
        };
    }
    return state;
};

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email: '',
            password: '',
        },
        inputValidities: {
            email: false,
            password: false,
        },
        isFormValid: false,
    });

    const authHandler = async () => {
        let action;
        if (isSignUp) {
            action = authActions.signUp(
                formState.inputValues.email,
                formState.inputValues.password,
            );
        } else {
            action = authActions.logIn(
                formState.inputValues.email,
                formState.inputValues.password,
            );
        }
        setError(null);
        setIsLoading(true);
        dispatch(
            action
        ).then(() => {
            setIsLoading(false);
        }).catch((err) => {
            setIsLoading(false);
            setError(err.message);
        });
    }

    useEffect(() => {
        if (error) {
            Alert.alert("Error occured!", error, [
                { text: 'Okay', style: 'default' }]);
        }
    }, [error]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier,
        });
    }, [dispatchFormState]);

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
                            errorText="Please enter a valid e-mail address"
                            onInputChange={inputChangeHandler}
                            initialValue=''
                            editable={!isLoading}
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType='default'
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize="none"
                            errorText="Please enter a valid password"
                            onInputChange={inputChangeHandler}
                            initialValue=''
                            editable={!isLoading}
                        />
                        {isLoading ?
                            <View style={styles.activityIndicatorContainer}>
                                <ActivityIndicator size='large' color={Colors.Secondary} />
                            </View>
                            :
                            <View style={styles.buttonViewContainer}>
                                <Button title={isSignUp ? "Sign Up" : "Log In"} color={Colors.Primary} onPress={authHandler} />
                            </View>

                        }

                        <View style={styles.buttonViewContainer}>
                            <Button title={`Switch to ${isSignUp ? "Log In" : "Sign Up"}`} color={Colors.Secondary} onPress={() => setIsSignUp(isSignUp => !isSignUp)} />
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView >
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
    activityIndicatorContainer: {
        marginTop: 10,
        backgroundColor: Colors.Primary,
    },
});

export default AuthScreen;