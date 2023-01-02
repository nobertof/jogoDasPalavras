import { StyleSheet, Dimensions } from "react-native";
import Theme from "./Theme";

const { width, height } = Dimensions.get("screen");


export default StyleSheet.create({
    backgroundView: {
        backgroundColor: Theme.Colors.secondary
    },
    mainContainer: {
        width: width,
        padding: Theme.Sizes.padding,
        backgroundColor: Theme.Colors.primary,
        borderBottomLeftRadius: Theme.Sizes.radius,
        borderBottomRightRadius: Theme.Sizes.radius,
        flexDirection: "row",
    },
    titleHeader: {
        marginHorizontal: Theme.Sizes.margin,
        fontSize: Theme.Sizes.title,
        color: Theme.Colors.white,
        textAlign: "center",
        fontWeight: 'bold'
    }
});