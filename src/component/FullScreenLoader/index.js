import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { gif } from '../../utils/variable';
import { styles } from './style';
import FastImage from 'react-native-fast-image';

export default class FullScreenLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <FastImage
          source={gif.loader}
          style={styles.loader}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  }
}
