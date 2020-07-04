import React from "react";
import { 
    View, 
    StyleSheet, 
    Text, 
    Image, 
    TouchableOpacity, 
    TouchableNativeFeedback, 
    Platform 
} from "react-native";

import Card from '../../components/UI/Card';

const ProductItem = (props) => {
    let TouchableComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableComponent = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchableContainer}>
                <TouchableComponent onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.imageURL }} />
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.title}</Text>
                            <Text style={styles.price}>₹{props.price.toFixed(2)}</Text>
                        </View>
                        {props.children}
                    </View>
                </TouchableComponent>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    product: {
        height: 300,
        margin: 15,
    },
    touchableContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'OpenSans-Bold',
    },
    price: {
        fontSize: 16,
        color: '#888',
        fontFamily: 'OpenSans-Regular',
    },
    details: {
        alignItems: 'center',
        height: '17%',
        padding: 10,
    },
});

export default ProductItem;
