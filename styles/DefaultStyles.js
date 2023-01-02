import { StyleSheet, Dimensions } from "react-native";
import Theme from "./Theme";

const { width, height } = Dimensions.get("screen");


export default StyleSheet.create({
    mainContainerApp: {
        flex: 1,
        backgroundColor: Theme.Colors.secondary
    },
    containerOptionsModalHome: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    linhaContainer: {
        width: width,
        flexDirection: "row",
        justifyContent: "center"
    },

    tecladoGame: {
        marginTop: Theme.Sizes.margin,
        flexDirection: "column",
        alignItems: "center"
    },
    linhaTeclado: {
        flexDirection: "row",
        justifyContent: "center"
    },
    containerWinnerAndLoserApp: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Theme.Colors.secondary
    },
    titleWinnerAndLoser: {
        fontSize: Theme.Sizes.title + 15,
        margin: Theme.Sizes.margin / 2,
        padding: Theme.Sizes.padding / 2,
        fontWeight: "bold",

    },
    titleWinnerAndLoserColor: (color) => {
        return {
            color: Theme.Colors[color]
        }
    },
    textWinnerAndLoser: {
        fontSize: Theme.Sizes.base,
        margin: Theme.Sizes.margin,
        fontWeight: "bold",
        color: Theme.Colors.white
    }
});