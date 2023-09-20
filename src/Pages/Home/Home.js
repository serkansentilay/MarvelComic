import { Text, View, FlatList } from 'react-native'
import React from 'react'
import Config from 'react-native-config'
import useFetch from '../../hooks/useFetch'
import MarvelCard from '../../components/MarvelCard'

const Home = ({ navigation }) => {
    const { data, error, loading } = useFetch(`${Config.API_URL}all.json`)

    if (loading) {
        return <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 30, color: 'black' }}>Loading..</Text>
    }

    if (error) {
        return <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 30, color: 'black' }}>{error}</Text>
    }

    const handleMarvelPress = (id) => {
        navigation.navigate("Detail", {
            id
        })
    }

    const renderMarvel = ({ item }) => <MarvelCard item={item} onPress={() => handleMarvelPress(item.id)} />

    return (
        <View>
            <Text>Home</Text>
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                numColumns={2}
                data={data.filter(snp => snp.id < 100)}
                keyExtractor={item => item.id}
                renderItem={renderMarvel}
            />
        </View>
    )
}

export default Home