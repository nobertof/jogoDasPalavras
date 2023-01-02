import React from "react";
import { StatusBar } from 'react-native';
import { View, Text, TouchableOpacity } from "react-native";
import { getHeaderTitle } from '@react-navigation/elements';
import HeaderStyle from "../styles/HeaderStyle";
import Theme from "../styles/Theme";
import { MaterialIcons } from '@expo/vector-icons';

export default function CustomHeader({ navigation, route, options, back }) {
    const title = getHeaderTitle(options, route.name);
    return (
        <View style={HeaderStyle.backgroundView}>
            <StatusBar style='light' backgroundColor={Theme.Colors.primary} />

            <View style={HeaderStyle.mainContainer}>
                {back && route.name != "Home" ?
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text><MaterialIcons name="keyboard-arrow-left" size={32} color={Theme.Colors.white} />  </Text>
                    </TouchableOpacity>
                    : null}
                <Text style={HeaderStyle.titleHeader}>{title}</Text>
            </View>
        </View>
    )
}