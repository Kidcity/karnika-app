import Base from './Base.service'
import { CHECK_VALID_GST_SLUG, REGISTER_FORM_BASIC_DATA_SLUG, GET_CITY_NAME_SLUG, REGISTER_SLUG, CHECK_VALID_PAN_SLUG, UPDATE_PROFILE_SLUG } from './Slug'

import { store } from '../redux/store'
import { setDefaultAddressAction } from '../redux/actions/addressAction'
import { loginAction } from '../redux/actions/loginAction'
import { setCartCountDataAction } from '../redux/actions/cartAction'
import { setWishListCount } from '../redux/actions/wishListAction'

class RegisterService extends Base {

    _checkValidGSTService(param) {

        return new Promise((resolve, reject) => {
            this.post(CHECK_VALID_GST_SLUG, param).then(response => {
                resolve(response)
            }, error => {
                // console.log(error);                           
                reject(error)
            })
        })
    }

    _checkValidPANService(param) {
        return new Promise((resolve, reject) => {
            this.post(CHECK_VALID_PAN_SLUG, param).then(response => {
                resolve(response)
            }, error => {
                reject(error)
            })
        })
    }

    _fetchBasicInfoService() {
        return new Promise((resolve, reject) => {
            this.post(REGISTER_FORM_BASIC_DATA_SLUG).then(response => {
                resolve(response)
            }, error => {
                reject(error)
            })
        })
    }

    _fetchCitiesService(param) {
        return new Promise((resolve, reject) => {
            this.post(GET_CITY_NAME_SLUG, param).then(response => {
                resolve(response)
            }, error => {
                reject(error)
            })
        })
    }

    _registerService(param) {
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(REGISTER_SLUG, param).then(response => {
                console.log(response);
                resolve(response)
            }, error => {
                console.log(error);
                reject(error)
            })
        })
    }

    _updateProfileService(param) {
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(UPDATE_PROFILE_SLUG, param).then(async response => {
                // const add = response?.data?.data?.data

                // console.log(response.data.data);

                const resp_data = response?.data?.data?.data

                const data = {
                    android_version: resp_data?.android_version,
                    ios_version: resp_data?.ios_version,
                    cust_manu_id: resp_data?.cust_manu_id,
                    default_address: resp_data?.default_address,
                    email: resp_data?.email,
                    first_name: resp_data?.first_name,
                    last_name: resp_data?.last_name,
                    image: resp_data?.image,
                    phone: resp_data?.phone,
                    shop_name: resp_data?.shop_name,
                    user_name: resp_data?.user_name,
                    user_type_id: resp_data?.user_type_id,
                    is_applied_for_credit: 0,
                    is_ws_not: +resp_data?.is_ws_not,
                    is_gst_verified: +resp_data?.is_gst_verified  // 0 - no record , 1 - has record
                }

                const add = resp_data?.default_address
                const address = {
                    address_book_id: add?.address_book_id,
                    name: add?.shop_name,
                    address: add?.entry_address1,
                    state: add?.zone_name,
                    pin: add?.entry_postcode,
                    country: add?.countries_name,
                    mobile: add?.phone,
                    email: add?.email,
                    isChecked: true
                }

                await store.dispatch(setDefaultAddressAction(address))
                await store.dispatch(loginAction(data))
                await store.dispatch(setCartCountDataAction(resp_data?.AddTheCart))
                await store.dispatch(setWishListCount(resp_data?.GetWishList))

                resolve({
                    status: true
                })
            }, error => {
                //console.log(error);                              
                reject(error)
            })
        })
    }
}

export default new RegisterService()