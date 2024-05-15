import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { fonts, normalize, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flex: 1,
        paddingHorizontal: setWidth(4),
    },
    row:{
        flexDirection:'row'
    },
    justifyBetween:{
        justifyContent:'space-between'
    },
    text:{
        fontSize: setWidth(3.5),
        color: colors.grey3,
        fontFamily: fonts.fontRegular
    },
    darkText:{
        color: colors.dark_charcoal
    },
    productCard:{
        marginTop: setWidth(5),
        flexDirection:'row',
        // height: setWidth(40)
    },
    leftBlock:{
        flex: 0.3,
        borderColor: colors.grey1,
        borderWidth: setWidth(0.3),
        justifyContent:'center'
    },
    rightBlock:{
        flex: 0.7,
        borderColor: colors.grey5,
        borderWidth: setWidth(0.3),
    },
    productImage:{    
        flex:1,      
        // height: normalize(120),
        // width: '100%'             
    },
    detailsBlock:{
        //paddingVertical: setWidth(1)
        paddingHorizontal: setWidth(2),
        paddingVertical: setWidth(2)
    },
    bottomborder:{
        borderColor: colors.grey5,
        borderWidth: setWidth(0.1),
        backgroundColor: colors.grey5
    },
    removeButton:{
        flex:1,
        // marginTop: 'auto',
        backgroundColor: colors.themeColor,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal: setWidth(4),
        paddingVertical: setWidth(3)
    },
    removeButtonText:{
        color: colors.white,
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3.2),        
    },
    empty:{
        marginTop: normalize(20)
    },
    emptyTxt:{
        fontSize: setWidth(4),
        color: colors.black,
        fontFamily: fonts.fontRegular,
        textAlign:'center',
        textTransform:'capitalize',
        lineHeight: normalize(18)
    }
})