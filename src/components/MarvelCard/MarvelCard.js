import { Text, View, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const MarvelCard = ({ item, onPress }) => {
    let photo = item.images.lg
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ marginHorizontal: 5 }}>
                <Text>MarvelCard</Text>
                <Image source={{ uri: photo }} resizeMode='contain' width={150} height={150} />
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>{item.name}</Text>
                <Text style={{ color: 'black', fontSize: 16 }}>{item.biography.fullName}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default MarvelCard

