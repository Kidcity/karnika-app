import Base from './Base.service'
import { ORDER_DETAILS_SLUG, REQUEST_DETAILS_SLUG } from './Slug'
import { store } from '../redux/store'
import { order_status } from '../utils/variable'

class OrderDetailsService extends Base {

    _getDetailsService(param) {
        //console.log(param);
        return new Promise((resolve, reject) => {
            this.post(ORDER_DETAILS_SLUG, param).then(response => {

                const state = store.getState().loginReducer
                const data = response?.data?.data?.data
                // console.log(JSON.stringify(data));
                //return
                let shipping_address = {
                    name: (data?.delivery_address.company) ? data?.delivery_address.company : data?.delivery_address.firstname,
                    address: data?.delivery_address.address + ',' + data?.delivery_address.city,
                    state: data?.delivery_address.zone_name,
                    pin: data?.delivery_address.postcode,
                    country: "India",
                    mobile: (data?.delivery_address.poc_mob != null) ? data?.delivery_address.poc_mob : state.data.phone,
                    email: state.data.email
                }

                let orderstatusarry = []
                let lastorderstatus = ''

                for (let index = 0; index < data?.order_status.length; index++) {
                    const element = data?.order_status[index];
                    // if(index == 0){
                    //     lastorderstatus = element.orders_status_name
                    // }
                    orderstatusarry.push(
                        {
                            id: element.status,
                            title: element.orders_status_name,
                            time: element.date_added,
                            isActive: true,
                        },
                    )
                }
  
                let products = []
                for (let index = 0; index < data.products.length; index++) {
                    const element = data.products[index];

                    //check the changes in new product
                    const out_of_stock_find = data?.new_products.filter((itm, idx) => (itm?.change_product_id === element?.change_product_id))

                    // console.log("out_of_stock_find ===> ", JSON.stringify(out_of_stock_find));


                    for (let idx = 0; idx < element.size_group.length; idx++) {
                        const item = element.size_group[idx];

                        if (idx == 0) {
                            lastorderstatus = item.orders_status_name
                        }
                        
                        products.push({
                            id: element.products_id,
                            brand_name: element.brand_name,
                            image: element.image,
                            set_qty_pcs: item.set_qty,
                            size: item.size_name,
                            set_qty: item.set_qty,
                            subsku: item.subsku,
                            qty_ordered: item.order_quantity,
                            new_qty_ordered: item?.new_set_qty,
                            total_qty_ordered: (parseInt(item.order_quantity) * parseInt(item.set_qty)),
                            color: item.color_names.length,
                            price: item.per_piece_price,
                            orders_status_name: item?.orders_status_name,
                            new_orders_status_name: item?.new_orders_status_name,
                            return_order_details: item.return_order_details,
                            credit_note_link: (item.credit_note) ? item.credit_note.credit_upload : null,
                            remark: item?.remark ?? ""
                        })
                    }

                    if(out_of_stock_find && out_of_stock_find.length > 0 ){
                        for (let index = 0; index < out_of_stock_find.length; index++) {
                            const changedelement = out_of_stock_find[index];

                            for (let idx = 0; idx < changedelement.size_group.length; idx++) {
                                const changedelementItem = changedelement.size_group[idx];
                                // console.log('changedelementItem   ',changedelementItem);
                                products.push({
                                    id: changedelement.products_id,
                                    brand_name: changedelement.brand_name,
                                    image: changedelement.image,
                                    set_qty_pcs: changedelementItem.set_qty,
                                    size: changedelementItem.size_name,
                                    set_qty: changedelementItem.set_qty,
                                    subsku: changedelementItem.subsku,
                                    qty_ordered: changedelementItem.order_quantity,
                                    new_qty_ordered: changedelementItem?.new_set_qty ?? "",
                                    total_qty_ordered: (parseInt(changedelementItem.order_quantity) * parseInt(changedelementItem.set_qty)),
                                    color: changedelementItem.color_names.length,
                                    price: changedelementItem.per_piece_price,
                                    orders_status_name: changedelementItem?.orders_status_name,
                                    new_orders_status_name: changedelementItem?.new_orders_status_name ?? "",
                                    return_order_details: changedelementItem.return_order_details,
                                    credit_note_link: (changedelementItem.credit_note) ? changedelementItem.credit_note.credit_upload : null,
                                    remark: changedelementItem?.remark ?? ""
                                })
                            }                            
                        }
                    }
                }

                // if (data?.new_products && data?.new_products.length > 0) {
                //     for (let index = 0; index < data.new_products.length; index++) {
                //         const element = data.products[index];

                //         for (let idx = 0; idx < element.size_group.length; idx++) {
                //             const item = element.size_group[idx];
                //             if (idx == 0) {
                //                 lastorderstatus = item.orders_status_name
                //             }
                //             products.push({
                //                 id: element.products_id,
                //                 brand_name: element.brand_name,
                //                 image: element.image,
                //                 set_qty_pcs: item.set_qty,
                //                 size: item.size_name,
                //                 set_qty: item.set_qty,
                //                 subsku: item.subsku,
                //                 qty_ordered: item.order_quantity,
                //                 new_qty_ordered: item?.new_set_qty,
                //                 total_qty_ordered: (parseInt(item.order_quantity) * parseInt(item.set_qty)),
                //                 color: item.color_names.length,
                //                 price: item.per_piece_price,
                //                 orders_status_name: item?.orders_status_name,
                //                 new_orders_status_name: item?.new_orders_status_name,
                //                 return_order_details: item.return_order_details,
                //                 credit_note_link: (item.credit_note) ? item.credit_note.credit_upload : null,
                //                 remark: item?.remark
                //             })
                //         }
                //     }
                // }
                // console.log('final products ===> ',products);
                const payment_breakup = data.payment_breakup

                resolve({
                    shipping_address,
                    payment_breakup,
                    // totalAmount: data.order_value_inc_tax,
                    products,
                    orderstatusarry,
                    lastorderstatus,
                    // cod_amount: data.cod_amount,
                    // payment_method: data.payment_method,
                    // prepaid_amount: data.prepaid_amount,
                    invoice_link: data.invoice_link,
                    salesorder_link: data.salesOrder_link,
                    delivery_partner: data.shippingProvider,
                    delivery_tracking_no: data.delivery_tracking_no,
                })

            }, error => {
                reject(error)
            })
        })
    }

    _getReqDetailsService(param) {
        console.log("_getReqDetailsService ----------- ",param);
        return new Promise((resolve, reject) => {
            this.post(REQUEST_DETAILS_SLUG, param).then(response => {

                const state = store.getState().loginReducer
                const data = response?.data?.data?.data
                // console.log(JSON.stringify(data));

                if (!data) {
                    reject({
                        messege: "Something went wrong."
                    })
                }

                let shipping_address = {
                    name: (data.delivery_address.company) ? data.delivery_address.company : data.delivery_address.firstname,
                    address: data.delivery_address.address + ',' + data.delivery_address.city,
                    state: data.delivery_address.zone_name,
                    pin: data.delivery_address.postcode,
                    country: "India",
                    mobile: (data.delivery_address.poc_mob != null) ? data.delivery_address.poc_mob : state.data.phone,
                    email: state.data.email
                }

                let orderstatusarry = []
                let lastorderstatus = ''

                for (let index = 0; index < data.order_status.length; index++) {
                    const element = data.order_status[index];
                    orderstatusarry.push(
                        {
                            id: element.orders_status_id,
                            title: element.orders_status_name,
                            time: element.date_added,
                            isActive: true,
                        },
                    )
                }

                let products = []
                for (let index = 0; index < data.products.length; index++) {
                    const element = data.products[index];

                    for (let idx = 0; idx < element.size_group.length; idx++) {
                        const item = element.size_group[idx];

                        if (idx == 0) {
                            lastorderstatus = item.orders_status_name
                        }
                        products.push({
                            id: element.products_id,
                            brand_name: element.brand_name,
                            image: element.image,
                            set_qty_pcs: item.set_qty , // parseInt(item.order_quantity) * parseInt(item.set_qty),
                            qty_ordered: item.order_quantity,
                            total_qty_ordered: (parseInt(item.order_quantity) * parseInt(item.set_qty)),
                            subsku: item.subsku,
                            size: item.size_name,
                            set_qty: item.set_qty,
                            color: item.color_names.length,
                            price: item.per_piece_price,
                            orders_status_name: item.orders_status_name,
                            return_order_details: item.return_order_details,
                            credit_note_link: (item.credit_note) ? item.credit_note.credit_upload : null,
                            remark: ""
                        })
                    }
                }

                const payment_breakup = data.payment_breakup

                let wholesaler_details = null
                if (data?.wholsaler_id) {
                    wholesaler_details = {
                        wholsaler_id: data?.wholsaler_id,
                        customer_name: data?.customer_name,
                        customer_mobile_no: data?.customer_mobile_no,
                        customer_address: data?.customer_address,
                        shop_name: data?.shop_name,
                        company_name: data?.company_name
                    }
                }

                resolve({
                    shipping_address,
                    payment_breakup,
                    // totalAmount: data.order_value_inc_tax,
                    products,
                    orderstatusarry,
                    lastorderstatus,
                    wholesaler_details
                    // cod_amount: data.cod_amount,
                    // payment_method: data.payment_method,
                    // prepaid_amount: data.prepaid_amount,
                    // invoice_link: data.invoice_link,
                    // salesorder_link: data.salesOrder_link,
                    // delivery_partner: data.shippingProvider,
                    // delivery_tracking_no: data.delivery_tracking_no
                })


            }, error => {
                reject(error)
            })
        })
    }

}
export default new OrderDetailsService()