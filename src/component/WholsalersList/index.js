import { FlatList, Text, View } from 'react-native'
import React, { Component, PureComponent } from 'react'
import { normalize, setWidth } from '../../utils/variable'
import NearByWholeSalerCard from '../NearByWholeSalerCard'
import EmptyContent from '../EmptyContent'

export default class WholsalersList extends PureComponent {


    renderItem = ({ item, index }) => {
        return (
            <NearByWholeSalerCard
                showCheckBox={this.props.showCheckBox ?? false}
                item={item}
                onPressCheckBox={()=> this.props.onPressCheckBox(item)}
                multiSelect={this.props.multiSelect}
            />
        )
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.wholesalers}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    style={{ marginTop: setWidth(2) }}
                    ItemSeparatorComponent={() => <View style={{ marginTop: setWidth(2) }} />}
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingBottom: normalize(20)
                    }}
                    ListEmptyComponent={() => 
                    <EmptyContent 
                    title={ (this.props.wholesalers && this.props.wholesalers.length === 0)? "There is no wholesalers in your location.\nPlease contact to Karnika Team.\n9903528105 / 9903428105" : "No nearby wholesaler on your location"} 
                    /> }
                />
            </View>
        )
    }
}