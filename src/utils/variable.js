import { Dimensions, PixelRatio, } from 'react-native'
import colors from './colors'


export const images = {
    /** karnika assets */
    profileimg: require("../../assets/profile-pic.jpg"),
    header_logo2: require('../../assets/header_logo2.jpg'),
    empty_product: require("../../assets/empty_product.png"),
    no_image: require("../../assets/no_image.jpg")
}

export const gif = {
loader: require("../../assets/videos/loader.gif")
}

export const icons = {
    bell: require("../../assets/icons/bell.png"),
    box: require("../../assets/icons/box.png"),
    file: require("../../assets/icons/file-minus.png"),
    navigation: require("../../assets/icons/navigation.png"),
    phone_call: require("../../assets/icons/phone-call.png"),
    shield: require("../../assets/icons/shield.png"),  
    heart: require("../../assets/icons/heart.png"),
    arrow_left: require("../../assets/icons/arrow-left.png"),
    shopping_cart: require("../../assets/icons/shopping-cart.png"),
    email: require("../../assets/icons/email.png"),
    facebook: require("../../assets/icons/facebook.png"),
    instagram: require("../../assets/icons/instagram.png"),
    web: require("../../assets/icons/web.png"),
    close_btn: require("../../assets/icons/close-button.png")
}

export const DEVICE_HEIGHT = Dimensions.get("screen").height
export const DEVICE_WIDTH = Dimensions.get("screen").width

export const setHeight = (height) => Dimensions.get("window").height * Number(height) / 100
export const setWidth = (width) => Dimensions.get("window").width * Number(width) / 100

export const order_status = [
    {
        id: 1,
        status: "Pending"
    },
    {
        id: 2,
        status: "Processing"
    },
    {
        id: 3,
        status: "Packaging Done"
    },
    {
        id: 4,
        status: "Shipping Requested"
    },
    {
        id: 5,
        status: "Dispatched"
    },
    {
        id: 6,
        status: "Delivered"
    },
    {
        id: 7,
        status: "Canceled"
    }
]


export const fonts = {
    fontBold: "Proxima Nova Bold",
    fontRegular: "ProximaNova-Regular",
    fontLight: "Proxima Nova Thin",
    fontStylish: "Pacifico-Regular",
    bold: "Proxima Nova Bold",
    regular: "ProximaNova-Regular",
    light: "Proxima Nova Thin",
}



const scale = (Dimensions.get("window").width / 320);
export const normalize = (size) => {
    const newSize = size * scale
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
}

export const formattedCurrency = (amount) => {
    if(amount){
       return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
}

export const cart_map_pointer = [
    {
        id: 1,
        title: "Cart",
        isDone: true,
        showRedDash: false
    },
    {
        id: 2,
        title: "Address",
        isDone: false,
        showRedDash: false
    },
    {
        id: 3,
        title: "Payment",
        isDone: false,
        showRedDash: false
    }
]


export const shadow_css = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
    elevation: 5
}


export const rupifi_status = {
    PRE_APPROVED: "PRE_APPROVED",
    ACTIVE: "ACTIVE",
    UNDER_REVIEW: "UNDER_REVIEW",
    REJECTED: "REJECTED",
    INCOMPLETE: "INCOMPLETE",
    PRE_APPROVAL_PENDING: "PRE_APPROVAL_PENDING",
    NEVER_APPLIED: "never_applied"
}

// demo_PAN = "gempn1116n"


export const appStoreLink = {
    androidstore: "https://play.google.com/store/apps/details?id=com.karnika",
    iosstore: "", // "itms-apps://itunes.apple.com/us/app/id1575728603"
}

export const ageList = [
    {
        title: "0-2",
        image: images.age_0_24_month
    },
    {
        title: "2-5",
        image: images.age_2_4_month
    },
    {
        title: "6-10",
        image: images.age_4_10_month
    },
    {
        title: "11-16",
        image: images.age_10_16_month
    }
]

export const colors_set = [
    {
        background: colors.blue,
        font: colors.white
    },
    {
        background: colors.lightRed,
        font: colors.white
    },
    {
        background: colors.primaryyellow,
        font: colors.white
    },
    {
        background: colors.pink1,
        font: colors.white
    }
]

export const payment_map = [
    'cod',
    'city_wallet',
    'rupifi',
    'online',
    'cod,city_wallet',
    'city_wallet,rupifi',
    'city_wallet,online',

    'city_wallet,cod',
    'rupifi,city_wallet',
    'online,city_wallet',
]


export const noimage = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"