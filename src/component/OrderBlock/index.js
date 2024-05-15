import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { images, normalize, setWidth } from '../../utils/variable';
import moment from 'moment'
import colors from '../../utils/colors';
import { commonStyle } from '../../helper/commonStyle';

export default class OrderBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    // console.log( this.props.item)

    const bgcolor = (this.props.item.order_status == "Pending") ? styles.status_orange :
      (this.props.item.order_status == "Return Rejected" || this.props.item.order_status == "Return Requested") ? styles.status_red :
      (this.props.item.order_status === "Dispatched")?
        styles.status_blue 
        :
        styles.status_green


    return (
      <TouchableOpacity style={[styles.contianer, this.props.is_ws_not === 1 && {paddingBottom: 0} ]} onPress={this.props.onPress}>
        {/* <View style={styles.imageContainer}>
          {
            this.props.item?.image ?
              <Image source={{ uri: this.props.item.image }} style={styles.image} resizeMode="cover" />
              :
              <Image source={images.no_image} style={{
                width: '100%',
                height: '100%' // normalize(60)
              }} resizeMode="cover" />
          }
        </View> */}

        {/* <Text>{ `${this.props.is_ws_not}` }</Text> */}
        <View style={{ paddingHorizontal: normalize(5) }}>
          <Text style={styles.subHeading} adjustsFontSizeToFit numberOfLines={2}>
            {this.props.is_ws_not === 0 ? "Request" : "Order"} No.:
            <Text style={[styles.text, { color: colors.orange3 }]}> {this.props.item.order_no}</Text>
          </Text>
          <Text style={styles.subHeading}>{this.props.is_ws_not === 0 ? "Request" : "Order"} Date :
            <Text style={[styles.text]}> {this.props.item.order_placed_on}</Text>
          </Text>
          {
            (this.props.item.delivery_date && this.props.item.delivery_date !== "") &&
            <Text style={styles.subHeading}>Delivered Date :
              <Text style={[styles.text]}> {this.props.item.delivery_date}</Text>
            </Text>
          }
        </View>
        <View style={{ paddingHorizontal: normalize(5) }}>
          <Text style={styles.subHeading} adjustsFontSizeToFit numberOfLines={2}>
            Total Quantity:
            <Text style={styles.text}> {this.props.item.total_quantity}</Text>
          </Text>
          <Text style={styles.subHeading}>Total Pieces :
            <Text style={[styles.text]}> {this.props.item.total_piece} Pcs</Text>
          </Text>
        </View>
        {
          this.props.is_ws_not === 1 &&
          <View style={[styles.orderstatusView, bgcolor]}>
            <Text style={styles.orderstatusText} adjustsFontSizeToFit numberOfLines={1}>{this.props.item.order_status}</Text>
          </View>
        }
      </TouchableOpacity>
    );
  }
}
