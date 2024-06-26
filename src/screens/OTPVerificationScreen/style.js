import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, normalize, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flexGrow:1,
        marginHorizontal: setWidth(4),
        paddingTop: setWidth(20),
        paddingBottom: setWidth(20)
    },
    row:{
        flexDirection: 'row'
    },
    infoText:{
        fontSize: setWidth(3.56),
        color: colors.blue,
        textAlign:'center',
        fontFamily: fonts.fontBold
    },
    lottiView:{
        height: setWidth(20),
        marginBottom: normalize(15)
      }, 
})