import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const EditProductScreen = (props) => {
    const prodId = props.route.params.productId;
    const editedProduct = useSelector(
        state => state.products.userProducts.find(prod => prod.id === prodId)
    )

    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageURL : '');
    const [price, setPrice] = useState(editedProduct ? editedProduct.price : '');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');





    if (prodId) {

    } else {

    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Image URL</Text>
                    <TextInput style={styles.input} value={imageUrl} onChangeText={imageUrl => setImageUrl(imageUrl)} />
                </View>
                {editedProduct ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Price</Text>
                        <TextInput style={styles.input} value={price} onChangeText={price => setPrice(price)} />
                    </View>)
                }
                <View style={styles.formControl}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput style={styles.input} value={description} onChangeText={description => setDescription(description)} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },
    formControl: {
        width: "100%",
    },
    label: {
        fontFamily: "OpenSans-Bold",
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
});

export default EditProductScreen;
