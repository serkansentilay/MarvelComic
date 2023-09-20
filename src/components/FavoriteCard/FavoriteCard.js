import { Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

const FavoriteCard = ({ item, onRemove }) => {
    console.log("item favoritecard", item)

    return (
        <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <Image source={{ uri: item.image }} width={50} height={50} borderRadius={50} />
            <View style={{ marginLeft: 10 }}>
                <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>{item.fullName}</Text>
            </View>
            <TouchableOpacity onPress={onRemove} >
                <Text style={{ color: 'red', fontSize: 20, textAlign: 'right' }}>Delete</Text>
            </TouchableOpacity>
        </View>

    )
}

export default FavoriteCard
