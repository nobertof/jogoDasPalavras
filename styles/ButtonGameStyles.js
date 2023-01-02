import { StyleSheet, Dimensions } from "react-native";
import Theme from "./Theme";

const { width, height } = Dimensions.get("screen");


export default StyleSheet.create({
    button: ({ backgroundColor, letras, selected = false }) => {
        return {
            width: width / (letras + 4),
            height: width / (letras + 4),
            borderRadius: Theme.Sizes.radius,
            margin: Theme.Sizes.margin / 2,
            padding: Theme.Sizes.padding / 2,
            borderWidth: selected ? 4 : 2,
            borderColor: Theme.Colors.primary,
            backgroundColor: Theme.Colors[backgroundColor],
            alignItems: "center",
            justifyContent: "center",
        }
    },
    textButton: ({ color, selected = false }) => {
        return {
            color,
            fontSize: 20,
            fontWeight: "bold",
            color: Theme.Colors[color],
            borderLeftWidth: selected ? 2 : 0,
            borderColor: Theme.Colors.light_gray,
            width: 'auto',
            height: 'auto',
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center"
        }
    }
});