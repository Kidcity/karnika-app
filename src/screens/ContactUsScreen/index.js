import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, FlatList } from 'react-native';
import CustomButton from '../../component/CustomButton';
import CustomHeader from '../../component/CustomHeader';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import colors from '../../utils/colors';
import { icons, normalize, setWidth } from '../../utils/variable';
import { styles } from './style';
import AppHeader from '../../component/AppHeader';
import NearByWholeSalerCard from '../../component/NearByWholeSalerCard'
import { connect } from 'react-redux';
import { commonStyle } from '../../helper/commonStyle';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import EmptyContent from '../../component/EmptyContent';

class ContactUsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_ws_not: 0,
            wholesalers: []
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0,
            wholesalers: props.hasOwnProperty("wholesalers") ? props.wholesalers : [],
        }
    }

    linkToWhatsapp() {
        Linking.openURL('https://wa.me/919883279470?text=Hello Karnika')
    }

    renderItem = ({ item, index }) => {
        return (
            <NearByWholeSalerCard item={item} showEditButton/>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <CustomHeader
                    heading="CONTACT US"
                    headingContainerStyle={{
                        flex: 0.8
                    }}
                    headingStyle={{
                        textAlign: 'center',
                    }}
                    showBackButton={true}
                    onPressBack={() => {
                        setScreenActivity({ action_type: "going_back", action_id: '' })
                        this.props.navigation.goBack()}}
                    showIcons={false}
                /> */}
                <AppHeader
                    showBackBtn
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <View style={styles.content}>
                    {
                        this.state.is_ws_not === 1 &&
                        <>
                            <CustomButton
                                container={{
                                    backgroundColor: colors.green,
                                    justifyContent: 'flex-start',
                                    marginTop: setWidth(5),
                                    paddingLeft: normalize(15),
                                }}
                                label="WHATSAPP US"
                                labelStyle={{ color: colors.white, marginLeft: normalize(15), }}
                                rightIcon={
                                    <FontAwesome name="whatsapp" size={normalize(27)} color={colors.white} />
                                }
                                leftIcon={false}
                                onPress={() => this.linkToWhatsapp()}
                            />
                            <CustomButton
                                container={{
                                    backgroundColor: colors.red,
                                    justifyContent: 'flex-start',
                                    marginTop: setWidth(5)
                                }}
                                label="CALL US"
                                labelStyle={{ color: colors.white, marginLeft: normalize(15), }}
                                rightIcon={
                                    <Feather name="phone-call" size={normalize(22)} color={colors.white} />
                                }
                                leftIcon={false}
                                onPress={() => Linking.openURL(`tel:+91 98832 79470`)}
                            />
                            <CustomButton
                                container={{
                                    backgroundColor: colors.blue2,
                                    justifyContent: 'flex-start',
                                    marginTop: setWidth(5)
                                }}
                                label="EMAIL US"
                                labelStyle={{ color: colors.white, marginLeft: normalize(15), }}
                                rightIcon={
                                    <Entypo name="mail-with-circle" color={colors.white} size={normalize(25)} />
                                }
                                leftIcon={false}
                                onPress={() => Linking.openURL(`mailto:karnikaindustriesindia@gmail.com`)}
                            />
                        </>
                    }
                    {
                        this.state.is_ws_not === 0 &&
                        <>
                            <View style={[commonStyle.row, commonStyle.alignItemsCenter, { marginTop: setWidth(4) }]}>
                                <Entypo name='location-pin' size={normalize(20)} color={colors.black} />
                                <Text style={styles.heading}>Your Nearby Wholesalers </Text>
                            </View>
                            <FlatList
                                data={this.state.wholesalers}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => index}
                                style={{ marginTop: setWidth(2) }}
                                ItemSeparatorComponent={() => <View style={{ marginTop: setWidth(2) }} />}
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingBottom: normalize(20)
                                }}
                                ListEmptyComponent={() =><EmptyContent title="No nearby wholesaler on your location" /> }
                            />
                        </>
                    }


                    {
                        this.state.is_ws_not === 1 &&
                        <View style={styles.footer}>
                            <Text style={[styles.heading,{marginTop: normalize(15)}]}>Connect with us : </Text>
                            <View style={[styles.row, { justifyContent: 'space-between', marginTop: normalize(10) }]}>
                                <TouchableOpacity style={styles.footerBlock} onPress={() => Linking.openURL("https://www.karnikaindustries.com/")}>
                                    <Text style={styles.blockTitle}>Facebook</Text>
                                    <Image source={icons.facebook} resizeMode="contain" style={styles.footerImage} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.footerBlock} onPress={() => Linking.openURL("https://www.instagram.com/karnika_india/")}>
                                    <Text style={styles.blockTitle}>Instagram</Text>
                                    <Image source={icons.instagram} resizeMode="contain" style={styles.footerImage} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.footerBlock} onPress={() => Linking.openURL("https://www.karnikaindustries.com/")}>
                                    <Text style={styles.blockTitle}>Website</Text>
                                    <Image source={icons.web} resizeMode="contain" style={styles.footerImage} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        is_ws_not: state.loginReducer.data.is_ws_not,
        wholesalers: state.homeReducer.wholesalers
    }
}

const mapDispatchToProps = dispatch => ({

})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(ContactUsScreen)

