import React, { useState, useEffect, useCallback, useReducer } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";

import * as ProductsActions from '../../store/actions/products';
import Input from '../../components/UI/Input';
import Colors from "../../constants/Color/Colors";

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

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.route.params.productId;
    const editedProduct = useSelector(
        state => state.products.userProducts.find(prod => prod.id === prodId)
    )
    const dispatch = useDispatch();
    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageURL : '',
            description: editedProduct ? editedProduct.description : '',
            price: '',
        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        },
        isFormValid: editedProduct ? true : false,
    });

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier,
        });
    }, [dispatchFormState]);

    useEffect(() => {
        if (error) {
            Alert.alert("An error occured!", error, [
                { text: 'Okay', style: 'default', onPress: props.navigation.goBack() }]);
        }
    }, [error]);

    const submitHandler = useCallback(() => {
        if (!formState.isFormValid) {
            Alert.alert("Wrong Input", "Please check the errors in the form", [{ text: "Okay" }])
            return;
        }

        setIsLoading(true);
        setError(null);

        if (editedProduct) {
            dispatch(ProductsActions.updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
            )).then(() => {
                setIsLoading(false);
                props.navigation.goBack();
            }).catch((err) => {
                setIsLoading(false);
                setError(err.message);
            });
        } else {
            dispatch(ProductsActions.createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price,
            )).then(() => {
                setIsLoading(false);
                props.navigation.goBack();
            }).catch((err) => {
                setIsLoading(false);
                setError(err.message);
            });
        }
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.Primary} />
            </View>
        );
    } else {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={10}
            >
                <ScrollView>
                    <View style={styles.form}>
                        <Input
                            id='title'
                            label='Title'
                            errorText="Please enter a title!"
                            keyboardType='default'
                            autoCapitalize='sentences'
                            returnKeyType='next'
                            onInputChange={inputChangeHandler}
                            initialValue={editedProduct ? editedProduct.title : ''}
                            initiallyValid={!!editedProduct}
                            required
                        />
                        <Input
                            id='imageUrl'
                            label='Image URL'
                            errorText="Please enter an Image URL!"
                            keyboardType='default'
                            returnKeyType='next'
                            onInputChange={inputChangeHandler}
                            initialValue={editedProduct ? editedProduct.imageURL : ''}
                            initiallyValid={!!editedProduct}
                            required
                        />
                        {editedProduct ? null : (
                            <Input
                                id='price'
                                label='Price'
                                errorText="Please enter a valid Price!"
                                keyboardType='decimal-pad'
                                returnKeyType='next'
                                onInputChange={inputChangeHandler}
                                required
                                min={0.1}
                            />)
                        }
                        <Input
                            id='description'
                            label='Description'
                            errorText="Please enter a Description!"
                            keyboardType='default'
                            autoCapitalize='sentences'
                            onInputChange={inputChangeHandler}
                            multiline
                            numberOfLines={3}
                            initialValue={editedProduct ? editedProduct.description : ''}
                            initiallyValid={!!editedProduct}
                            required
                            minLength={5}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EditProductScreen;
