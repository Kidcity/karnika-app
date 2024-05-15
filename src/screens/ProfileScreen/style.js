import { StyleSheet } from "react-native";
import colors from '../../utils/colors'
import { fonts, normalize, setWidth } from "../../utils/variable";

export const styles = StyleSheet.create({
    contianer:{
        flex: 1,
        backgroundColor: colors.white
    },
    content:{
        flexGrow: 1,
        marginHorizontal: setWidth(4),
        paddingBottom: setWidth(20)
    },
    profileInfoContainer:{
        paddingHorizontal: setWidth(2),
        paddingVertical: setWidth(5),        
        borderRadius: setWidth(2),
        backgroundColor: colors.themeColor,
        marginTop: normalize(10)
    },
    row:{
        flexDirection: 'row'
    },
    imageContainer:{
        width: '100%',
        height: normalize(160),
        overflow: 'hidden',  
        borderRadius: normalize(10)   
    },
    image:{
        width: '100%',
        height: '100%'
    },
    nameContainer:{
        flex:1,
        justifyContent:'center',
        marginLeft: normalize(3)
    },
    name:{
        fontSize: setWidth(3.8),
        color: colors.white,
        fontFamily: fonts.fontRegular,
    },
    name2:{
        fontSize: setWidth(3.2),
        color: colors.white,
        marginTop: normalize(3),
        fontFamily: fonts.fontRegular
    },
    location:{
        flex:1,
        fontSize: setWidth(3),
        color: colors.white,
        marginLeft: setWidth(1),
        fontFamily: fonts.fontRegular,
        textTransform:'capitalize'   
    },
    walletAmountView:{
        backgroundColor: colors.green1,
        paddingHorizontal: setWidth(3),
        borderRadius: setWidth(1),
        // marginLeft: setWidth(3),        
        justifyContent:'center'
    },
    walletAmount:{
        color: colors.white,
        fontFamily: fonts.fontBold,
        fontSize: setWidth(3),
    },
})