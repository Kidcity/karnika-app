import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, normalize, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.grey5
    },
    content:{
        flex: 1,
        marginHorizontal: setWidth(2)
    },
    btnImage:{
        width: setWidth(10),
        height: setWidth(10),
        marginRight: setWidth(3)
    },
    row:{
        flexDirection: 'row'
    },
    heading:{
        fontFamily: fonts.bold,
        color: colors.dark_charcoal,
        fontSize: normalize(15),        
    },
    footer:{
        marginTop: normalize(35),
        borderTopColor: colors.grey7,
        borderTopWidth: normalize(1),
        // position: 'absolute',
        // bottom: 10,
        // width: '100%',
    },
    footerBlock:{
        width: setWidth(25),
        height: setWidth(25),
        justifyContent:'center',
        alignItems:'center'
    },
    blockTitle:{
        fontSize: setWidth(3),
        fontFamily: fonts.fontBold,
        color: colors.black,
        marginBottom: setWidth(2)
    },
    footerImage:{
        width: setWidth(13),
        height: setWidth(13),
    },
    card:{
        
    }
})