import { StyleSheet, Dimensions } from "react-native";
import colors from "../../utils/colors";
import { setHeight, setWidth } from "../../utils/variable";

const {width, height} = Dimensions.get("screen")

export const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        width: width,
        height: height,
        backgroundColor: colors.white,
        zIndex: 9999,
        justifyContent:'center',
        alignItems:'center'
    },  
   loader:{
    width: setWidth(90),
    height: setHeight(40),
    marginTop: -80
    // backgroundColor: 'red',
   }
})