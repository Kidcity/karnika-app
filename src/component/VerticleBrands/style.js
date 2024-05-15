import { StyleSheet } from "react-native";
import  colors  from "../../utils/colors";
import { DEVICE_WIDTH, fonts, normalize } from "../../utils/variable";

export const styles = StyleSheet.create({
    container:{
        // backgroundColor: colors.white,
        
        // paddingHorizontal: normalize(10), 
        // paddingVertical: normalize(5)
    },
    heading:{
        paddingVertical: normalize(10),
        paddingHorizontal: normalize(10),
        // backgroundColor: 'red', 
    },
    title:{
        fontFamily: fonts.bold,
        color: colors.black,
        fontSize: normalize(12),
        textTransform:'uppercase'
    },
    brand:{
        width: (DEVICE_WIDTH / 2) - 40,
        height: normalize(180),
        borderRadius: normalize(10),
        overflow:'hidden',
        backgroundColor: colors.white
    },
    image:{
        width: '100%',
        height: normalize(135)
    },
    separator:{
        marginTop: normalize(17)
    }
})