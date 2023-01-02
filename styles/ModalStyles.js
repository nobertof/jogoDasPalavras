import { StyleSheet, Dimensions } from "react-native";
import Theme from "./Theme";

const { width, height } = Dimensions.get("screen");


export default StyleSheet.create({
    mainContainer: {
        alignItems: "center",
        justifyContent: "center",
        width,
        height
    },
    mainContainerContent: {
        minHeight: "17%",
        maxHeight: "70%",
        width: "95%",
        borderRadius: Theme.Sizes.radius,
        zIndex: 11,
        backgroundColor: Theme.Colors.primary

    },
    backgroundContainer: {
        backgroundColor: Theme.Colors.gray,
        opacity: 0.2,
        width: width,
        height: height,
        position: "absolute",
        zIndex: 10,
    },
    containerClose: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: Theme.Colors.margin,

    },
    labelText: {
        fontSize: Theme.Sizes.base,
        fontWeight: "bold",
        color: Theme.Colors.white,
        margin: Theme.Sizes.margin
    },
    closeButton: {
        padding: Theme.Sizes.padding,
        margin: Theme.Sizes.margin
    }
});