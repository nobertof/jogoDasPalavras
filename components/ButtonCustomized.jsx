import 'react-native-gesture-handler';
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import ButtonStyles from '../styles/ButtonStyles';


export default function ButtonCustomized({ onPress = () => { }, label, color = "white", backgroundColor = "success", icon, style, selected, labelStyle }) {

    return (
        <TouchableOpacity onPress={onPress} style={[ButtonStyles.mainContainer({ backgroundColor, selected }), style]}>
            {icon && icon}
            <Text style={[ButtonStyles.label({ color, selected }), labelStyle]}>{label}</Text>
        </TouchableOpacity>
    )
}