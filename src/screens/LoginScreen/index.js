import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, StatusBar, Linking, Alert, NativeModules, Platform, Keyboard } from 'react-native';
import { styles } from './style';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomTextInput from '../../component/CustomTextInput';
import CustomButton from '../../component/CustomButton';
import Feather from 'react-native-vector-icons/Feather'
import { fonts, images, normalize, setWidth } from '../../utils/variable';
import colors from '../../utils/colors';
import LoginService from '../../services/LoginService';
import { errorAlert, retryAlert } from '../../helper/ToastHelper';
import LottieView from 'lottie-react-native';
import FullScreenLoader from '../../component/FullScreenLoader';
import { Strings } from '../../utils/strings';
import { connect } from 'react-redux';
import EmptyCartModal from '../../component/EmptyCartModal';
import SignupModal from '../../component/SignupModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { _crashApp, _setCrashLog, _setCrashUserID } from '../../helper/CrashlyticsHelper';
import RNRestart from 'react-native-restart';
import { getDeviceToken } from '../../helper/NotificationHelper';

const { StatusBarManager } = NativeModules

class LoginScreen extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
      showLoader: false,
      showPassword: false,
      statusbarheight: 0,
      applogo: "",
      shoModal: false,
      errMessage: '',
      showErrorModal: false
    };
  }


  // 9163029201 - wholesaler
  // 123456 - 

  // 9831028860 - retailer
  // 123456 - 

  async componentDidMount() {

    this._isMounted = true
    //this.animation.play();
    if (Platform.OS === 'ios') {
      StatusBarManager.getHeight(response => {
        if (this._isMounted) {
          this.setState({
            statusbarheight: response.height
          })
        }
      }
      )
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }


  async _login() {

    Keyboard.dismiss()

    let device_token = await AsyncStorage.getItem('@device_token_KARNIKA')
    if (!device_token) {

      const token = await getDeviceToken()
      if (token) {
        device_token = token
      } else {
        Alert.alert("Relaunch App", "Please relaunch the app to intialize notitifcation helpers.", [
          {
            title: "Relaunch",
            onPress: () => RNRestart.restart()
          }
        ])
        return
      }
      
    }
    const param = {
      mobile: this.state.phone,
      // password: this.state.password,
      app_type: 3,
      fcm_token: device_token,
    }
    console.log(param);

    this.setState({ showLoader: true })
    await LoginService._loginService(param).then(response => {

      if (this._isMounted) {
        this.setState({ showLoader: false })
        this.props.navigation.navigate("OTPVerificationScreen", { phone: this.state.phone, what_for: "login" })
      }

    }, error => {
      // console.log(error);   
      if (this._isMounted) {
        this.setState({ showLoader: false })
        if (error.message == "server_error") {
          retryAlert(() => this._login())
        } else {
          if (error.otp_verification === false) {
            errorAlert("Error", error.message)
            this.props.navigation.navigate("OTPVerificationScreen", { phone: this.state.phone, what_for: "login" })
          }
          // errorAlert("Error", error.message)
          this.setState({
            showErrorModal: true,
            errMessage: error.message
          })
        }
      }
    })
  }

  render() {

    return (
      <KeyboardAwareScrollView contentContainerStyle={[styles.container]} keyboardShouldPersistTaps="handled">


        <View style={[styles.header]} resizeMode="cover">
          <Image source={images.header_logo2} resizeMode="contain" style={styles.logo} />
        </View>

        <View style={styles.content}>


          <CustomTextInput
            container={[styles.inputContainer]}
            leftIcon={<Feather name='phone-call' size={setWidth(4)} color={colors.grey2} />}
            placeholder="Mobile Number"
            keyboardType="number-pad"
            value={this.state.phone}
            onChangeText={(e) => this.setState({ phone: e })}
          // testId="phonenumber"
          // accessibilityLabel="phonenumber"
          />


          <CustomButton
            container={{
              backgroundColor: colors.themeColor,
              paddingHorizontal: setWidth(7),
              paddingRight: setWidth(9),
              marginTop: setWidth(8)
            }}
            label={Strings.loginScreenStrings.loginBtnText}
            labelStyle={{ color: colors.white }}
            iconColor={colors.white}
            onPress={() => this._login()}
            leftIcon
          />
          <CustomButton
            container={{
              backgroundColor: colors.white,
              borderColor: colors.themeColor,
              borderWidth: setWidth(0.3),
              marginTop: setWidth(5),
              paddingHorizontal: setWidth(7),
              paddingRight: setWidth(9),
            }}
            label={Strings.loginScreenStrings.signupBtnText}
            labelStyle={{ color: colors.themeColor }}
            iconColor={colors.themeColor}
            onPress={() => this.setState({ shoModal: true })}
            leftIcon
          />

          <View style={{ marginTop: setWidth(20) }}>
            <Text style={styles.connectingbrandText}>{Strings.loginScreenStrings.connectingBrandsText}</Text>
            <LottieView
              autoPlay
              loop
              style={styles.lottiView}
              source={require("../../utils/login_screen_animation.json")}
            />
          </View>

          <View style={[styles.footer, { marginTop: setWidth(1) }]}>
            <Feather name='check-circle' size={setWidth(4)} color={colors.themeColor} />
            <View style={[styles.row, { flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: normalize(4) }]}>
              <Text style={styles.footerText} >{Strings.loginScreenStrings.bottomText1}
                <Text style={[styles.link]} onPress={() => Linking.openURL("https://Karnikaindustries.com/terms.html")}> {Strings.loginScreenStrings.bottomText2}</Text>
                {" "} {Strings.loginScreenStrings.bottomText3}
                <Text style={[styles.link]}> {Strings.loginScreenStrings.bottomText4}</Text>
              </Text>
            </View>
          </View>

        </View>

        {
          this.state.showLoader &&
          <FullScreenLoader
            isOpen={this.state.showLoader}
          />
        }
        {
          this.state.shoModal &&
          <SignupModal
            heading={"Signup As"}
            title="Please select an option :"
            leftBtnTitle="Retailer"
            rightBtnTitle="Wholsaler"
            onClose={() => this.setState({ shoModal: false })}
            headingStyle={{
              fontSize: setWidth(8),
              color: colors.dark_charcoal
            }}
            onPressContinueShopping={() => {
              this.setState({
                shoModal: false
              })
              this.props.navigation.navigate("RegisterScreen", { reg_type: 1, reg_label: "Wholsaler" })
            }}
            onPressClose={() => {
              this.setState({
                shoModal: false
              })
              this.props.navigation.navigate("RegisterScreen", { reg_type: 0, reg_label: "Retailer" })
            }}
          />
        }

        {
          this.state.showErrorModal &&
          <EmptyCartModal
            title={this.state.errMessage}
            showProcessBtn={false}
            onPressContinueShopping={() => {
              this.setState({ showErrorModal: false })
            }}
            onPressClose={() => this.setState({ showErrorModal: false })}
          />
        }
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    applogo: state.commonReducer?.appLogo
  }
}

const mapDispatchToProps = dispatch => ({
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(LoginScreen)

