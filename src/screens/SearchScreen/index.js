import { BackHandler, FlatList, Image, Keyboard, NativeModules, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { setScreenActivity } from '../../helper/AppActivityTrackingHelper';
import { styles } from './style';
import { icons, normalize, setHeight, setWidth } from '../../utils/variable';
import colors, { dark_charcoal } from '../../utils/colors';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CommonService from '../../services/CommonService';
import { connect } from 'react-redux';
import { clearProductFilterAction, setProductFilterAction } from '../../redux/actions/commonAction';
import { store } from '../../redux/store'
import { clearProductListData } from '../../redux/actions/productListAction';
import LottieView from 'lottie-react-native';
import TopTrends from '../../component/TopTrends';
import HomeService from '../../services/HomeService';
import TopBrandToday from '../../component/TopBrandToday';

const { StatusBarManager } = NativeModules

class SearchScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchText: "",
            statusbarheight: 0,
            user_id: '',
            city_id: '',
            suggestions: [],
            loading: false,
            topbrand: [],
            topsearchProduct: [],
            nodata: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            user_id: props.user_id ? props.user_id : "",
            city_id: props.hasOwnProperty("city_id") ? props.city_id : ''
        }
    }

    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            'focus',
            async () => {
             this.setState({
                nodata: false
             })
            })
      
        this._getTopBrand()
        this._getTopSearched()
        if (Platform.OS === 'ios') {
            StatusBarManager.getHeight(response =>
                this.setState({
                    statusbarheight: response.height
                })
            )
        }
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove()
        this.willFocusSubscription()
    }

    _getTopBrand() {

        const param = {
            gender: this.state.selectedGender + "",
            retailer_id: this.state.user_id
        }

        HomeService._getTopBrandService(param).then(response => {            
            this.setState({
                topbrand: response?.topbrand
            })
        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._getTopBrand())
            } else {
                // errorAlert("Error in get cities", error.message)
            }
        })
    }

    _getTopSearched() {

        const param = {
            gender: this.state.selectedGender + "",
            retailer_id: this.state.user_id
        }

        HomeService._getTopBrandService(param).then(response => {            
            this.setState({
                topsearchProduct: response?.topbrand
            })
        }, error => {
            if (error.message == "server_error") {
                retryAlert(() => this._getTopBrand())
            } else {
                // errorAlert("Error in get cities", error.message)
            }
        })
    }

    debounce = (func) => {
        // console.log('debounce ');
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            const context = this;
            func.apply(context);
        }, 800);

    };

    onChangeText = (e) => {
        this.setState({
            searchText: e,
            loading: true
        }, () => {
            this.debounce(this._getSuggestions)
        })
    }

    _getSuggestions = () => {

        if (this.state.searchText == '') {
            Keyboard.dismiss()
            this.setState({
                suggestions: [],
                nodata: false
            })
            return
        }

        const param = {
            retailer_id: this.state.user_id ?? "",
            name: this.state.searchText,
            city: this.state.city_id
        }

        // console.log('param  ==> ', param);

        CommonService._getSuggestionsService(param).then(response => {

            this.setState({
                suggestions: response.data,
                loading: false,
                nodata: (response?.data && response?.data.length > 0) ? false : true
            })
        }, error => {
            this.setState({
                loading: false
            })
            errorAlert("Sorry", error.message)
        })
    }

    onPressSuggessionItem(item) {

        this.setState({ searchText: "", suggestions: [] }, async () => {
            this._navigate(item.name, item?.city_id)
        })
    }

    onPressSearchIcon = () => {
        this._navigate(this.state.searchText, "")
    }

    async _navigate(searchText, city_id = '') {
        if(searchText === ""){
            return
        }
        await store.dispatch(clearProductListData())
        await store.dispatch(clearProductFilterAction())

        let filter = store.getState().commonReducer.filter
        filter = {
            ...filter,
            city: (this.state.city_id != '') ? this.state.city_id : (city_id != '') ? city_id : '',
            searchValue: searchText
        }

        await store.dispatch(setProductFilterAction(filter))

        setScreenActivity({ action_type: "searchwise_list", action_id: '', city_id: "" })

        this.props.navigation.navigate("ProductListing")

    }

    backAction = () => {
        setScreenActivity({ action_type: "going_back", action_id: '' })
        if (!this.props.navigation.canGoBack()) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        } else {
            this.setState({
                searchText: "",
                suggestions: []
            })
            this.props.navigation.goBack();
        }
        return true
    };

    async _brandWistList(brand = null) {

        await store.dispatch(clearProductListData())
        await store.dispatch(clearProductFilterAction())

        let param = this.props.filter
        param = {
          ...param,
          brand: brand.id.toString(),
          city: brand.city_id.toString()
        }
    
        await store.dispatch(setProductFilterAction(param))
        this.props.navigation.navigate("ProductListing")
      }

    render() {
        return (
            <>
                <View style={styles.searchBar}>
                    {
                        Platform.OS === "ios" &&
                        <View style={{ height: this.state.statusbarheight, backgroundColor: colors.white }} />
                    }
                    <TouchableOpacity style={[styles.icon]} onPress={this.backAction}>
                        <Image source={icons.arrow_left} style={[{ width: setWidth(7), height: setWidth(7), tintColor: colors.black }]} />
                    </TouchableOpacity>
                    <View style={styles.inputView}>
                        <TextInput
                            value={this.state.searchText}
                            onChangeText={this.onChangeText}
                            style={styles.searchInput}
                            placeholder="Search For Brands, Items or More..."
                            placeholderTextColor={colors.grey3}
                        />
                    </View>
                    <TouchableOpacity style={[styles.icon]} onPress={this.onPressSearchIcon}>
                        <AntDesign name='search1' size={setWidth(6)} color={colors.dark_charcoal} />
                    </TouchableOpacity>
                </View>
                <KeyboardAwareScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: normalize(30) }} >
                    <View style={styles.content}>
                        <View style={{}}>
                            <FlatList
                                data={this.state.suggestions}
                                renderItem={({ item, index }) =>
                                    <TouchableOpacity style={styles.suggestionTextView} onPress={() => this.onPressSuggessionItem(item)}>
                                        <Text style={[styles.suggestionText]}>{item.name}</Text>
                                        <Feather name='arrow-up-left' size={setWidth(6)} color={colors.dark_charcoal} />
                                    </TouchableOpacity>
                                }
                                keyExtractor={(item, index) => index}
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingBottom: setHeight(10),
                                }}
                                ListEmptyComponent={() => <View style={styles.emptyComponentView}>
                                    {
                                        (this.state.searchText === "" || this.state.searchText != "" && this.state.loading === false) ?
                                            <>
                                                <LottieView
                                                    autoPlay
                                                    loop
                                                    style={styles.lottiView}
                                                    source={require("../../utils/emptylist.json")}
                                                />
                                                <Text style={styles.emptyText} adjustsFontSizeToFit numberOfLines={1}>
                                                    {
                                                        this.state.nodata ?
                                                            "No Data Found"
                                                            :
                                                            "Search Your favourite brand, items and more..."
                                                    }
                                                </Text>
                                            </>
                                            :
                                            (this.state.loading) &&
                                            <Text style={styles.emptyText} adjustsFontSizeToFit numberOfLines={1}>Loading...</Text>
                                    }

                                </View>
                                }
                            />
                        </View>
                        {
                            (this.state.searchText === "" && (this.state.topbrand.length > 0 || this.state.topsearchProduct.length > 0)) &&
                            <Text style={styles.heading}>Shop Now</Text>
                        }
                        {
                            (this.state.topbrand && this.state.topbrand.length > 0 && this.state.searchText === "") &&
                            <TopBrandToday
                                data={this.state.topbrand}
                                title="Top Trend Products"
                                // showAsTopBrand={true}
                                onPressBrand={(brand) => this._brandWistList(brand)}
                                onPressProduct={(product_id) => this.props.navigation.navigate("ProductDetails", { product_id: product_id })}

                                onPressViewMore={(brand) => this._brandWistList(brand)}
                            />
                        }
                        {
                            (this.state.topsearchProduct && this.state.topsearchProduct.length > 0 && this.state.searchText === "") &&
                            <TopBrandToday
                                data={this.state.topsearchProduct}
                                title="Top Searched Products"
                                onPressBrand={(brand) => this._brandWistList(brand)}
                                onPressProduct={(product_id) => this.props.navigation.navigate("ProductDetails", { product_id: product_id })}

                                onPressViewMore={(brand) => this._brandWistList(brand)}
                            />
                        }
                    </View>

                </KeyboardAwareScrollView>
            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        user_id: state.loginReducer.data.cust_manu_id,
    }
}

const mapDispatchToProps = dispatch => ({
})

const connectComponent = connect(mapStateToProps, mapDispatchToProps)
export default connectComponent(SearchScreen)


/**
 * 
 * (!this.state.suggestions)?
                                    <Text style={styles.emptyText} adjustsFontSizeToFit numberOfLines={1}>Sorry Not Found.</Text>
 */