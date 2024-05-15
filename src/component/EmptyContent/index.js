import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { styles } from './style'
import CustomImage from '../FastImage'
import { images } from '../../utils/variable'

export default class EmptyContent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <CustomImage
                    source={images.empty_product}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.noitem}>
                    {
                        this.props.title ?? "No Items to show."
                    }
                </Text>
            </View>
        )
    }
}