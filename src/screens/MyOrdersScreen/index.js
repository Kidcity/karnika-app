import React, { Component } from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, TextInput, Keyboard, Animated, Platform, BackHandler } from 'react-native';
import CustomHeader from '../../component/CustomHeader';
import { DEVICE_WIDTH, images, normalize, setWidth } from '../../utils/variable';
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign'
import OrderBlock from '../../component/OrderBlock';
import OrderListService from '../../services/OrderListService';
import { errorAlert, retryAlert } from '../../helper/ToastHelper';
import { connect } from 'react-redux';
import FullScreenLoader from '../../component/FullScreenLoader';
import colors from '../../utils/colors';
import Entypo from 'react-native-vector-icons/Entypo'
import { Easing, log } from 'react-native-reanimated';
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import AppHeader from '../../component/AppHeader';
import EmptyContent from '../../component/EmptyContent';

class MyOrdersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allOrders: [],
            filtered_data: [],
            order_status_type: [
                {
                    id: 0,
                    title: "ALL",
                    tag: null,
                    isActive: true
                },
                {
                    id: 1,
                    title: "PENDING",
                    tag: 'Pending',
                    isActive: false
                },
                {
                    id: 5,
                    title: "DISPATCHED",
                    tag: 'Dispatched',
                    isActive: false
                },
                {
                    id: 6,
                    title: "DELIVERED",
                    tag: 'Delivered',
                    isActive: false
                }
            ],
            searchText: '',
            showLoader: false,
            containerOpacity: new Animated.Value(0),
            is_ws_not: 0,
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            allOrders: props.orderListReducer ? props.orderListReducer.order_list : [],
            is_ws_not: props.hasOwnProperty("is_ws_not") ? props.is_ws_not : 0,
        }
    }

    renderOrderItem = ({ item, index }) => {

        return (
            <OrderBlock
                is_ws_not={this.state.is_ws_not}
                item={item}
                onPress={() => {
                    this.props.navigation.navigate("OrderDetails", { order_id: item.id, is_ws_not: this.state.is_ws_not })
                }}
                onPressReturn={() => {
                    this.props.navigation.navigate("ReturnOrder", { order_id: item.id, is_ws_not: this.state.is_ws_not })
                }}
            />
        )
    }

    filterOrderList(filter = null, index) {
        const orders = this.state.allOrders
        if (filter && orders.length > 0) {
            this.setState({ showLoader: true }, async () => {
                const filteredData = await orders.filter(item => item.order_status == filter)
                this.setState({
                    filtered_data: filteredData,
                    showLoader: false
                })
            })
        }
        else {
            this.setState({
                filtered_data: orders
            })
        }

        const order_status_type = this.state.order_status_type
        order_status_type.map((item, index) => item.isActive = false)
        order_status_type[index].isActive = true
        this.setState({
            order_status_type: order_status_type
        })
    }

    _searchOrder() {
        // Keyboard.dismiss()
        const orders = this.state.allOrders
        const searchText = this.state.searchText
        if (searchText != '' && orders.length > 0) {
            this.setState({ showLoader: true }, async () => {
                const filteredData = await orders.filter(item => item.order_no.includes(searchText))
                this.filterOrderList( null ,0)
                this.setState({
                    filtered_data: filteredData,
                    showLoader: false
                })
            })
        }
        else {
            Keyboard.dismiss()
            this.setState({
                filtered_data: orders
            })
        }
    }

    async _fetchOrders() {
        const param = {
            retailer_id: this.props.loginReducer.data.cust_manu_id,
            status: "",
            name: this.state.searchText
        }
        console.log(param);
        this.setState({ showLoader: true })
        await OrderListService._getOrdersService(param).then(response => {
            this.setState({
                showLoader: false,
                filtered_data: this.state.allOrders
            }, () => {
                this.visibleContent()
            })
        }, error => {
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._fetchOrders())
            } else {
                errorAlert("Oops!", error.message)
            }
        })
    }

    async _fetchRequest() {
        const param = {
            retailer_id: this.props.loginReducer.data.cust_manu_id,
            status: 1,
            name: this.state.searchText
        }
        // console.log(param);
        this.setState({ showLoader: true })
        await OrderListService._getRequestService(param).then(response => {

            this.setState({
                showLoader: false,
                filtered_data: this.state.allOrders
            }, () => {
                this.visibleContent()
            })
        }, error => {
            //  console.log(this.state.filtered_data);
            this.setState({ showLoader: false })
            if (error.message == "server_error") {
                retryAlert(() => this._fetchRequest())
            } else {
                errorAlert("Oops!", error.message)
            }
        })
    }

    componentDidMount() {
        if (this.state.is_ws_not == 0) {
            this.setState({
                order_status_type: [
                    {
                        id: 0,
                        title: "All Requests",
                        tag: null,
                        isActive: true
                    },
                ]
            })
            this._fetchRequest()
        } else {
            this._fetchOrders()
        }
        // this._fetchOrders()
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    visibleContent() {
        Animated.timing(
            this.state.containerOpacity,
            {
                toValue: 1,
                duration: 500,
                easing: Easing.linear(),
                useNativeDriver: false
            }
        ).start()
    }

    backAction = () => {

        setScreenActivity({ action_type: "going_back", action_id: '', city_id: "" })

        if (!this.props.navigation.canGoBack()) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        } else {
            this.props.navigation.goBack();
        }
        return true;
    };

    debounce = (func) => {
        // console.log('debounce ');
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            const context = this;
            func.apply(context);
        }, 200);

    };

    onChangeText = (e) => {
        this.setState({
            searchText: e,
            loading: true
        }, () => {
            this.debounce(this._searchOrder)
        })
    }
    
    render() {

        return (
            <View style={styles.container}>
                <AppHeader
                    showBackBtn
                    showSearch
                    showWishList
                    showLogo
                    navigation={this.props.navigation}
                />
                <View>
                    {
                        this.state.is_ws_not === 0 &&
                        <View style={{width: '100%',justifyContent:'center'}}>
                        <TouchableOpacity
                            style={[
                                styles.orderTypeBtn,
                               styles.activeOrderTypeBtn,
                               {
                                width: '92%',
                                alignSelf:'center',
                                marginRight: 0
                               }
                            ]}
                        >
                            <Text style={[styles.orderTypeBtnText, styles.activeOrderTypeBtnText]}>Request Details</Text>
                        </TouchableOpacity>
                        </View>
                    }

                    {
                        this.state.is_ws_not === 1 &&
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.ordertypeItemView]} contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} >
                            {
                                this.state.is_ws_not === 1 &&
                                this.state.order_status_type.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            style={[
                                                styles.orderTypeBtn,
                                                item.isActive && styles.activeOrderTypeBtn,
                                            ]}
                                            key={index}
                                            onPress={() => this.filterOrderList(item.tag, index)}
                                        >
                                            <Text style={[styles.orderTypeBtnText, item.isActive && styles.activeOrderTypeBtnText]}>{item.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    }
                </View>
                <View style={[styles.content]}>

                    <View style={styles.searchViewContainer}>
                        <TouchableOpacity style={{ paddingHorizontal: setWidth(3) }} onPress={() => this._searchOrder()}>
                            <AntDesign name='search1' size={setWidth(6)} color={colors.grey1} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.searchTextInut}
                            placeholder={`Search All ${this.state.is_ws_not === 1 ? "Orders" : "Request"} Here....`}
                            value={this.state.searchText}
                            onChangeText={this.onChangeText}
                            placeholderTextColor={colors.grey3}
                        />
                        <TouchableOpacity style={{ paddingHorizontal: setWidth(3) }} onPress={() => this.setState({ searchText: '', filtered_data: this.state.allOrders })}>
                            <Entypo name='cross' size={setWidth(7)} color={colors.dark_charcoal} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.filtered_data}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderOrderItem}
                        // numColumns={2}
                        ListEmptyComponent={() => <EmptyContent />}
                        // columnWrapperStyle={{
                        //     justifyContent:'space-between'
                        // }}
                        ItemSeparatorComponent={() => <View style={{ marginTop: normalize(15) }} />}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingVertical: normalize(10),
                            paddingHorizontal: normalize(12)

                            // paddingBottom: Platform.OS === 'ios' ? setWidth(7) : setWidth(8)
                        }}
                    />

                </View>
                {
                    this.state.showLoader &&
                    <FullScreenLoader

                    />
                }
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
        orderListReducer: state.orderListReducer,
        is_ws_not: state.loginReducer.data.is_ws_not,
    }
}

const mapDispatchToProps = dispatch => ({
    //clearLoginData: () => dispatch(clearLoginData())
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(MyOrdersScreen)
