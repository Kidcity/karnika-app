import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, Linking } from 'react-native';
import colors from '../../utils/colors';
import { icons, setWidth } from '../../utils/variable';
import { styles } from './style';
import { commonStyle } from '../../helper/commonStyle';
import CustomButton from '../CustomButton';

export default class EmptyCartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProcessBtn: true,
      heading: "",
      showLeftButton: true
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      showProcessBtn: props.hasOwnProperty("showProcessBtn") ? props.showProcessBtn : true,
      showLeftButton: props.hasOwnProperty("showLeftButton") ? props.showLeftButton : true,
      heading: props.hasOwnProperty("heading") ? props.heading : "",
    }
  }

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={() => {
        }}>
        <View style={styles.container}>
          <View style={[styles.content, commonStyle.shadow]}>
            {
              (this.state.heading !== "") &&
              <Text style={[styles.heading, this.props.headingStyle]}>
                {this.state.heading}
              </Text>
            }
            <Text style={styles.title}>{this.props.title}</Text>

            {
              this.props.showCallBtn &&
              <CustomButton
                container={{
                  // backgroundColor: colors.red,
                  justifyContent: 'center',
                  marginTop: setWidth(5)
                }}
                label="CALL US"
                labelStyle={{ color: colors.black, fontSize: setWidth(4) }}
                rightIcon={
                  <Image source={icons.phone} resizeMode="contain" style={styles.btnImage} />
                }
                leftIcon={false}
                onPress={() => Linking.openURL(`tel:033-2655-8101`)}
              />
            }

            <View style={[styles.row, { justifyContent: 'space-evenly', marginTop: setWidth(5) }]}>
              {
                this.state.showLeftButton &&
                <TouchableOpacity style={[styles.btn, this.props.leftBtnStyle]} onPress={this.props.onPressClose}>
                  <Text style={[styles.btnText, { color: colors.white }]}>
                    {
                      (this.props.leftBtnTitle) ?
                        this.props.leftBtnTitle.toUpperCase()
                        :
                        "Close".toUpperCase()
                    }
                  </Text>
                </TouchableOpacity>
              }
              {
                this.state.showProcessBtn &&
                <TouchableOpacity style={[styles.btn, this.props.rightBtnStyle, { backgroundColor: colors.themeColor }]} onPress={this.props.onPressContinueShopping}>
                  <Text style={[styles.btnText, { color: colors.white }]}>
                    {
                      this.props.rightBtnTitle ?
                        (this.props.rightBtnTitle).toUpperCase()
                        :
                        "Shop Now".toUpperCase()
                    }
                  </Text>
                </TouchableOpacity>
              }
            </View>
          </View>
        </View>
      </Modal>
    )
    return (
      <View style={styles.container}>

      </View>
    );
  }
}
