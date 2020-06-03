import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const GoalItem = props => {
    return(
        <TouchableOpacity activeOpacity={0.6} onPress={props.onDelete.bind(this, props.id)}>
        <View 
            style={styles.goalViewContent}>
            <Text >{props.title}</Text>
        </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    goalViewContent: {
        padding: 10,
        marginTop: 10,
        backgroundColor: '#CCC',
        borderColor: 'black',
        borderWidth: 2
    }
}); 

export default GoalItem;