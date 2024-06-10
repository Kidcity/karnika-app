import React, { Component } from 'react';
import { View, Text, ScrollView, Image, Animated, BackHandler } from 'react-native';
import colors from '../../utils/colors';
import { icons, images, normalize, setWidth } from '../../utils/variable';
import { styles } from './style';
import { connect } from 'react-redux';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Feather from 'react-native-vector-icons/Feather'
import TextCard from '../../component/TextCard';
import { clearLoginData } from '../../redux/actions/loginAction';
import { clearProductListData } from '../../redux/actions/productListAction';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import FooterTabMenu from '../../component/FooterTabMenu';
import FastImage from 'react-native-fast-image';
import { Easing } from 'react-native-reanimated';
import { logout } from '../../helper/Logout';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import AppHeader from '../../component/AppHeader';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import CustomImage from '../../component/FastImage';

class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userdata: {},
            isDemoLogin: false,
            imageContainer: new Animated.Value(0),
            imageVisibility: new Animated.Value(1),
            city_wallet_amt: 0,
            rupifi_credit_balance: 0,
            rupifi_soa_url: '',
            rupifi_account_status: '',
            rupifi_repayment_url: '',
            is_ws_not: 0
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            userdata: props.loginReducer.data ? props.loginReducer.data : {},
            isDemoLogin: props.loginReducer.hasOwnProperty("demoLoggedin") ? props.loginReducer.demoLoggedin : false,
            city_wallet_amt: props.loginReducer.city_wallet_amt ? props.loginReducer.city_wallet_amt : 0,
            rupifi_credit_balance: props.rupifi_credit_balance ? props.rupifi_credit_balance : 0,
            rupifi_soa_url: props.rupifi_soa_url ? props.rupifi_soa_url : '',
            rupifi_account_status: props.rupifi_account_status ? props.rupifi_account_status : '',
            rupifi_repayment_url: props.rupifi_repayment_url ? props.rupifi_repayment_url : '',
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0
        }
    }

    componentDidMount() {
        //alert('mount')
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.props.navigation.addListener('blur', () => {
            this.setState({
                imageContainer: new Animated.Value(0),
                imageVisibility: new Animated.Value(1),
            })
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    _logout() {
        logout()
    }

    async _navigateToProductList(searchText = '') {
        await this.props.clearProductListData()
        await this.props.clearProductFilterAction()

        let param = this.props.filter
        param = {
            ...param,
            searchValue: searchText
        }
        await this.props.setProductFilterAction(param)
        // return
        this.props.navigation.navigate("ProductListing")
    }

    moveToRight() {
        Animated.timing(
            this.state.imageContainer,
            {
                toValue: setWidth(90),
                duration: 900,
                easing: Easing.linear(),
                useNativeDriver: false
            },
        ).start()

        Animated.timing(
            this.state.imageVisibility,
            {
                toValue: 0,
                duration: 900,
                useNativeDriver: false
            }
        ).start()
        setTimeout(() => {
            this.props.navigation.navigate("EditProfile")
        }, 600);
    }

    handleBackButtonClick() {
        setScreenActivity({ action_type: "going_back", action_id: '', city_id: "" })
        this.props.navigation.goBack();
        return true;
    }

    render() {

        return (
            <View style={styles.contianer}>
                <AppHeader
                    showMenu
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <ScrollView contentContainerStyle={styles.content}>

                    <View style={styles.imageContainer}>
                        {
                            (this.state.userdata.image != '') ?
                                <CustomImage
                                    source={{ uri: this.state.userdata?.image ,  priority: FastImage.priority.high}}
                                    resizeMode="cover"
                                    style={[styles.image]}
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
                                <SimpleLineIcons name='location-pin' size={setWidth(3.7)} color={colors.white} />
                                <Text style={styles.location} numberOfLines={2}>
                                    {this.state.userdata?.default_address?.entry_address1} , {this.state.userdata?.default_address?.entry_city} {this.state.userdata?.default_address?.entry_postcode} {this.state.userdata?.default_address?.zone_name}
                                </Text>
                            </View>
                        }
                    </View>

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3),
                            backgroundColor: colors.btnGreen,
                            borderRadius: normalize(4),
                            paddingHorizontal: normalize(4),
                        }}
                        // image={icons.shopping_bag}
                        leftText={"Edit Profile"}
                        leftIcon={<Feather name='edit' size={setWidth(5)} color={colors.white} />}
                        onPress={() => { this.props.navigation.navigate("EditProfile") }}
                        rightIcon={<Feather name='arrow-right' size={setWidth(5)} color={colors.white} />}
                        titleStyle={{
                            fontSize: setWidth(3.3),
                            color: colors.white
                        }}
                    />

                    <TextCard
                        containerStyle={{
                            marginTop: setWidth(3),
                            borderBottomWidth: 0,
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
                            marginTop: setWidth(3),
                            borderBottomWidth: 0,
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
                            marginTop: setWidth(3),
                            borderBottomWidth: 0,
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
                            marginTop: setWidth(3),
                            borderBottomWidth: 0,
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


                </ScrollView>

                <FooterTabMenu
                    focused={true}
                    route_name="Profile"
                    navigation={this.props.navigation}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        filter: state.commonReducer.filter,
        rupifi_credit_balance: state.applyForCreditReducer.rupifi_credit_balance,
        rupifi_soa_url: state.applyForCreditReducer.rupifi_soa_url,
        rupifi_account_status: state.applyForCreditReducer.rupifi_account_status,
        rupifi_repayment_url: state.applyForCreditReducer.rupifi_repayment_url,
        is_ws_not: state.loginReducer.data.is_ws_not
    }
}

const mapDispatchToProps = dispatch => ({
    clearLoginData: () => dispatch(clearLoginData()),
    clearProductFilterAction: () => dispatch(clearProductFilterAction()),
    setProductFilterAction: (data) => dispatch(setProductFilterAction(data)),
    clearProductListData: () => dispatch(clearProductListData())

})
const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(ProfileScreen)
