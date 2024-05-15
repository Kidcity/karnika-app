import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import { styles } from './style';
import colors from '../../utils/colors';
import { icons, images, normalize, setWidth } from '../../utils/variable';
import TextCard from '../TextCard';
import Feather from 'react-native-vector-icons/Feather'
import { connect } from 'react-redux';
import { clearLoginData } from '../../redux/actions/loginAction';
import FastImage from 'react-native-fast-image';
import { logout } from '../../helper/Logout';
import VersionInfo from 'react-native-version-info'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class CustomDrawerMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: null,
            isDemoLogin: false,
            city_wallet_amt: 0,
            rupifi_credit_balance: 0,
            rupifi_soa_url: '',
            rupifi_repayment_url: "",
            rupifi_account_status: '',
            is_ws_not: 0
        };

    }

    static getDerivedStateFromProps(props, state) {
        return {
            userdata: props.loginReducer.data ? props.loginReducer.data : {},
            isDemoLogin: props.loginReducer.hasOwnProperty("demoLoggedin") ? props.loginReducer.demoLoggedin : false,
            city_wallet_amt: props.loginReducer.city_wallet_amt ? props.loginReducer.city_wallet_amt : 0,
            rupifi_credit_balance: props.rupifi_credit_balance ? props.rupifi_credit_balance : 0,
            rupifi_soa_url: props.rupifi_soa_url ? props.rupifi_soa_url : '',
            rupifi_repayment_url: props.rupifi_repayment_url ? props.rupifi_repayment_url : '',
            rupifi_account_status: props.rupifi_account_status ? props.rupifi_account_status : '',
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
        }
    }

    _rateus() {
        // SettingsService._rateinPlaystore()
    }

    componentDidMount() {
        // this.animation.play();
    }

    render() {

        return (
            <View style={styles.container}>
                <DrawerContentScrollView {...this.props} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    <View style={styles.imageContainer}>
                        {
                            (this.state.userdata.image != '') ?
                                <FastImage
                                    style={[styles.image]}
                                    source={{
                                        uri: this.state.userdata.image,
                                        priority: FastImage.priority.high,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                :
                                <Image source={images.profileimg} style={styles.image} resizeMode="cover" />
                        }
                    </View>

                    <View style={styles.profileInfoContainer}>
                        <View style={styles.nameContainer}>
                            {
                                this.state.userdata.shop_name &&
                                <Text numberOfLines={2} style={styles.name}>{this.state.userdata.shop_name}</Text>
                            }
                            {
                                this.state.userdata.first_name &&
                                <Text numberOfLines={2} style={styles.name2}>Hi, {this.state.userdata.first_name}</Text>
                            }
                        </View>
                        {
                            this.state.userdata?.default_address &&
                            <View style={[styles.row, { alignItems: 'center', marginTop: setWidth(2) }]}>
                                <SimpleLineIcons name='location-pin' size={setWidth(3.8)} color={colors.white} />
                                <Text style={styles.location} numberOfLines={2}>
                                    {this.state.userdata?.default_address?.entry_address1} , {this.state.userdata?.default_address?.entry_city} {this.state.userdata?.default_address?.entry_postcode} {this.state.userdata?.default_address?.zone_name}
                                </Text>
                            </View>
                        }
                    </View>

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(2),
                            backgroundColor: colors.green,
                            borderRadius: normalize(4),
                            paddingHorizontal: normalize(5),
                        }}
                        leftText={"Edit Profile"}
                        leftIcon={<Feather name='edit' size={setWidth(5)} color={colors.white} />}
                        onPress={() => { this.props.navigation.navigate("EditProfile") }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.white} />}
                        titleStyle={{
                            fontSize: setWidth(3.8),
                            color: colors.white
                        }}
                    />

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        leftIcon={<Ionicons name='bag-handle-sharp' size={setWidth(6)} color={colors.black} />}
                        leftText={this.state.is_ws_not == 1 ? "My Orders" : "My Request"}
                        onPress={() => { this.props.navigation.navigate("MyOrders") }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.black} />}
                        titleStyle={{
                            fontSize: setWidth(3.3),
                            color: colors.black,
                            letterSpacing: 0.5
                        }}
                    />

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        leftIcon={<AntDesign name='heart' size={setWidth(5)} color={colors.black} />}
                        leftText="Wishlist"
                        onPress={() => { this.props.navigation.navigate("WishList") }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.black} />}
                        titleStyle={{
                            fontSize: setWidth(3.3),
                            color: colors.black,
                            letterSpacing: 0.5
                        }}
                    />

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        leftIcon={<MaterialIcons name='phone' size={setWidth(6)} color={colors.black} />}
                        leftText={this.state.is_ws_not == 0 ? "Contact" : "Contact Us"}
                        onPress={() => {
                            this.props.navigation.navigate("ContactUs")
                        }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.black} />}
                        titleStyle={{
                            fontSize: setWidth(3.3),
                            color: colors.black,
                            letterSpacing: 0.5
                        }}
                    />

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        leftIcon={<Ionicons name='settings-sharp' size={setWidth(5)} color={colors.black} />}
                        leftText="Settings"
                        onPress={() => { this.props.navigation.navigate("Settings") }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.black} />}
                        titleStyle={{
                            fontSize: setWidth(3.3),
                            color: colors.black,
                            letterSpacing: 0.5
                        }}
                    />

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        leftIcon={
                            <Entypo name='youtube' size={setWidth(5)} color={colors.red} />
                        }
                        leftText="App Tutorial"
                        onPress={() => Linking.openURL("https://www.youtube.com/@karnikaindia")}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.black} />}
                        titleStyle={{
                            fontSize: setWidth(3.3),
                            color: colors.black,
                            letterSpacing: 0.5
                        }}
                    />

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3)
                        }}
                        leftIcon={
                            <Entypo name='log-out' size={setWidth(5)} color={colors.black} />
                        }
                        leftText="Logout"
                        onPress={logout}
                        titleStyle={{
                            fontSize: setWidth(3.3),
                            color: colors.black,
                            letterSpacing: 0.5
                        }}
                    />

                    <View style={styles.versionView}>
                        <Image source={images.header_logo2} resizeMode="contain" style={styles.logo} />
                        {
                            <>
                                <Text style={styles.versionText}>Version: {VersionInfo.appVersion.toString()}</Text>
                                <Text style={styles.versionText}>Version Code: {VersionInfo.buildVersion.toString()}</Text>
                            </>
                        }
                    </View>


                </DrawerContentScrollView>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        version_code: state.loginReducer.version_code,
        version_name: state.loginReducer.version_name,
        rupifi_credit_balance: state.applyForCreditReducer.rupifi_credit_balance,
        rupifi_soa_url: state.applyForCreditReducer.rupifi_soa_url,
        rupifi_repayment_url: state.applyForCreditReducer.rupifi_repayment_url,
        rupifi_account_status: state.applyForCreditReducer.rupifi_account_status,
        is_ws_not: state.loginReducer.data.is_ws_not
    }
}

const mapDispatchToProps = dispatch => ({
    clearLoginData: () => dispatch(clearLoginData())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(CustomDrawerMenu)
