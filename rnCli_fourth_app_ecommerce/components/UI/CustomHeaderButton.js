import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from 'react-native-elements';
import Colors from '../../constants/Color/Colors';

const CustomHeaderButton = (props) => {
    return (
        <Icon
            {...props}
            reverse
            color={Colors.Primary}
            size={23}
        />
    );
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;
