import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { styles } from './style';
import CustomImage from '../FastImage';
import { commonStyle } from '../../helper/commonStyle';
import { images, normalize, setWidth } from '../../utils/variable';
import CustomButton from '../CustomButton';
import colors from '../../utils/colors';

export default class VerticleBrands extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            data: null,
            containerStyle: null,
            onPress: undefined
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            data: props.hasOwnProperty("data") ? props.data : null,
            title: props.hasOwnProperty("title") ? props.title : null,
            containerStyle: props.hasOwnProperty("containerStyle") ? props.containerStyle : null,
            onPress: props.hasOwnProperty("onPress") ? props.onPress : undefined,
        }
    }

    renderBrandsItem = ({ item, index }) => {
        
        return (
            <TouchableOpacity style={[styles.brand, commonStyle.shadow]} onPress={()=> this.state.onPress(item.id)}>
                <CustomImage
                    source={{uri: item.image}}
                    style={styles.image}
                    resizeMode="stretch"
                />
                <View style={{
                    flex: 1,
                    paddingVertical: normalize(5),
                    justifyContent:'center',
                    paddingHorizontal: normalize(5)
                }}>
                <Text style={[commonStyle.text10, commonStyle.fontBold, commonStyle.textAlignCenter, commonStyle.textCharcoal]} numberOfLines={2} >{item.title}</Text>  
                </View>               
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={[styles.container, this.state.containerStyle]}>
                <View style={styles.heading}>
                    <Text style={styles.title}>
                        {
                            this.state.title
                        }
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => index}
                        renderItem={this.renderBrandsItem}
                        numColumns={2}
                        contentContainerStyle={{
                            paddingBottom: normalize(10)
                        }}
                        columnWrapperStyle={{
                            justifyContent: 'space-evenly'
                        }}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
                <CustomButton
                    container={{
                        backgroundColor: colors.themeColor,
                        marginTop: setWidth(2),
                        paddingHorizontal: setWidth(7),
                        paddingRight: setWidth(9),
                        marginHorizontal: setWidth(2)
                    }}
                    label="VIEW ALL PRODUCTS"
                    labelStyle={{ color: colors.white }}
                    iconColor={colors.white}
                    onPress={this.props.onPressViewAll}
                    leftIcon={true}
                />
            </View>
        )
    }
}