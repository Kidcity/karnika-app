import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import { DEVICE_WIDTH, fonts, normalize, setHeight, setWidth } from "../../utils/variable";
import { commonStyle } from '../../helper/commonStyle';

export const styles = StyleSheet.create({
    contianer:{
        // width: (DEVICE_WIDTH / 2) - setWidth(6),
        backgroundColor: colors.white,
        borderColor: colors.grey1,
        borderWidth: normalize(1),
        borderRadius: normalize(8),
        overflow:'hidden',
        ...commonStyle.shadow,
        paddingBottom: normalize(8)
    },
    imageContainer:{
        height: normalize(180),
        width: '100%'
    },
    image:{
        width: '100%',
        height: '100%',
    },
    orderstatusView:{
        // height: setHeight(3),
        justifyContent:'center',
        marginTop: normalize(10),
        paddingVertical: normalize(5)
    },
    orderstatusText:{
        color: colors.white,
        textAlign:'center',
        textTransform:'capitalize',
        fontSize: setWidth(2.8)
    },
    subHeading:{
        fontFamily: fonts.fontRegular,
        color: colors.grey2,
        fontSize: setWidth(3.3),
        fontWeight: 'bold',
        marginTop: normalize(5)
    },
    text:{
        fontSize: setWidth(3),
        fontFamily: fonts.fontRegular,
        color: colors.grey2,
    },
    status_blue:{
        backgroundColor: colors.blue2
    },
    status_green: {
        backgroundColor: colors.green1
    },
    status_orange: {
        backgroundColor: colors.orange3
    },
    status_red: {
        backgroundColor: colors.red
    },
    returnBtn:{
        backgroundColor: colors.lightRed,
        padding: setWidth(2),
        width: setWidth(30),
        borderRadius: setWidth(2),
        marginTop: setWidth(3)    
    },
    returnBtnText:{
        color: colors.white,
        textAlign:'center',
        fontSize: setWidth(3)                       
    }
})