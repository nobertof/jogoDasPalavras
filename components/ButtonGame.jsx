import React from "react";
import { TouchableOpacity, Text } from "react-native";

import ButtonGameStyles from "../styles/ButtonGameStyles";
export default function ButtonGame({ label = "", letras = 6, color = 'white', backgroundColor = 'primary', onPress = () => { }, selected }) {

    return (
        <TouchableOpacity style={ButtonGameStyles.button({ backgroundColor, letras, selected })} onPress={onPress}>
            <Text style={ButtonGameStyles.textButton({ color, selected })}>{label}</Text>
        </TouchableOpacity>
    )
}