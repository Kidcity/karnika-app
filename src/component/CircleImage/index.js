import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { images, setWidth } from '../../utils/variable';
import { styles } from './style';
import Feather from 'react-native-vector-icons/Feather'
import colors from '../../utils/colors';
import CustomImage from '../FastImage';
import FastImage from 'react-native-fast-image';

export default class CircleImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.container]} activeOpacity={0.6} onPress={this.props.onPress}>
        {
          this.props.image ?
            <CustomImage
              source={{ uri: this.props.image, priority: FastImage.priority.high }}
              resizeMode="cover"
              style={[styles.image]}
            />
            :
            <Feather name='camera' size={setWidth(7)} color={colors.white} />
        }
        {
          this.props.footerImage &&
          <View style={styles.footerImage}>
            <Feather name='camera' size={setWidth(5)} color={colors.dark_charcoal} />
          </View>
        }
      </TouchableOpacity>
    );
  }
}
