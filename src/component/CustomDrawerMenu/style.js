import { StyleSheet, NativeModules, Platform } from "react-native";
import colors from "../../utils/colors";
import { fonts, normalize, setHeight, setWidth } from "../../utils/variable";

const {StatusBarManager} = NativeModules
const upperheight = Platform.OS === 'ios' ? StatusBarManager.HEIGHT + setWidth(3) : setWidth(3)

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.white,
        // width: setWidth(75)
    },
    content:{
        flexGrow:1,
        // paddingTop: upperheight,
        marginHorizontal: normalize(8),
        paddingBottom: normalize(20),
    },
    profileInfoContainer:{
        paddingHorizontal: setWidth(2),
        paddingVertical: setWidth(5),        
        borderRadius: setWidth(2),
        // paddingLeft: normalize(10),
        backgroundColor: colors.themeColor,
        marginTop: normalize(6)
    },
    row:{
        flexDirection: 'row'
    },
    imageContainer:{
        width: '100%',
        height: normalize(130),
        overflow: 'hidden', 
        borderRadius: normalize(10)          
    },
    image:{
        width:'100%',
        height:'100%'
    },
    nameContainer:{
        flex:1,
        justifyContent:'center',
        marginLeft: normalize(3)
    },
    name:{
        fontSize: setWidth(3.5),
        color: colors.white,
        fontFamily: fonts.fontRegular,
    },
    name2:{
        fontSize: setWidth(2.5),
        color: colors.white,
        marginTop: normalize(3),
        fontFamily: fonts.fontRegular
    },
    location:{
        flex:1,
        fontSize: setWidth(2.7),
        color: colors.white,
        marginLeft: setWidth(1),
        fontFamily: fonts.fontRegular,
        textTransform:'capitalize'   
    },
    creditView:{
        backgroundColor: colors.green1,
        paddingVertical: setWidth(3),
        paddingHorizontal: setWidth(2),
        borderRadius: setWidth(2),
        marginTop: setWidth(3)
    },
    creditText:{
        color: colors.white,
        fontSize: setWidth(3),
        fontFamily: fonts.fontRegular
    },
    versionView:{
        // flex:1,
        marginTop: 'auto',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        // backgroundColor:'red'
        //paddingRight: setWidth(2),
    },
    logo:{
        width: setWidth(6),
        height: setHeight(6),       
        aspectRatio:1,
    },
    versionText:{
        color: colors.grey2,
        fontFamily: fonts.fontRegular,
        fontSize: setWidth(3)
    },
    walletAmountView:{
        backgroundColor: colors.green1,
        paddingHorizontal: setWidth(2),
        borderRadius: setWidth(1),
        // marginLeft: setWidth(3),        
        justifyContent:'center'
    },
    walletAmount:{
        fontSize: setWidth(3),
        color: colors.white,
        fontFamily: fonts.fontBold
    },
    lottiView: {
        // position: 'relative',
        height: setHeight(1),
        width: setWidth(5),
        // backgroundColor: 'red',
        // alignSelf: 'center',
    },
})