import { StyleSheet, Dimensions } from "react-native";
import Theme from "./Theme";

const { width, height } = Dimensions.get("screen");


export default StyleSheet.create({
    mainContainer: ({ backgroundColor = "success" }) => {
        return {
            backgroundColor: Theme.Colors[backgroundColor],
            borderRadius: Theme.Sizes.radius,
            alignItems: "center",
            flexDirection: "row",
            margin: Theme.Sizes.margin,
            padding: Theme.Sizes.padding
        }
    },
    label: ({ color = "white" }) => {
        return {
            color: Theme.Colors[color],
            borderRadius: Theme.Sizes.radius,
            fontSize: Theme.Sizes.base,
            fontWeight: "bold",
            alignItems: "center",
            margin: Theme.Sizes.margin,

        }
    }
});