import { StyleSheet } from "react-native";
import { fonts, normalize, setHeight, setWidth } from "../../utils/variable";
import colors from "../../utils/colors";


export const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    image: {
        width: setWidth(50),
        height: setHeight(50),
    },
    noitem: {
        fontSize: setWidth(4),
        color: colors.black,
        fontFamily: fonts.fontRegular,
        textAlign: 'center',
        textTransform: 'capitalize',
        marginTop: -normalize(55)
    }
})