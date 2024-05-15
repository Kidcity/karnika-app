import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        width: setWidth(6),
        height: setWidth(6),
        //backgroundColor: colors.lightRed,
        borderColor: colors.themeColor,
        borderWidth: setWidth(0.3),
        borderRadius: setWidth(6),
        justifyContent:'center',
        alignItems:'center'
    },
    circle:{
        width: setWidth(4),
        height: setWidth(4),
        backgroundColor: colors.themeColor,
        borderRadius: setWidth(6)
    }
})