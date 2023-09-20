import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import firestore from "@react-native-firebase/firestore"
import FavoriteCard from '../../components/FavoriteCard'
import { signOutGoogle } from '../../context/Auth/AuthSlice'
const Profil = () => {
    const { user } = useSelector(state => state.auth)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    console.log("user", user)

    useEffect(() => {
        getFavorities()
    }, [])

    const getFavorities = async () => {
        await firestore().collection("Users").doc(user.uid).collection("Favorities").get().then(snp => {
            snp.forEach(doc => {
                console.log("snp foreach,", doc.data())
                setData(prev => [...prev, doc.data()])
            })
        })
        setLoading(false)
    }
    if (loading) {
        return <Text style={{ alignItems: 'center', justifyContent: 'center', flex: 1, color: 'green' }}>Loading...</Text>
    }

    const goSignout = () => {
        dispatch(signOutGoogle())
    }

    const handleRemoveFavorite = async (id) => {
        await firestore().collection("Users").doc(user.uid).collection("Favorities").doc(`${id}`).delete()
        setData([])
        getFavorities()

    }

    const renderFavorite = ({ item }) => <FavoriteCard item={item} onRemove={() => handleRemoveFavorite(item.id)} />

    return (
        <View style={{ justifyContent: 'center', padding: 10 }}>
            <TouchableOpacity onPress={goSignout}>
                <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'blue' }}>Log out</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: 'black' }}>{user?.displayName}</Text>
                <Image source={{ uri: user?.photoURL }} width={100} height={100} />
            </View>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'red' }}>Favorities</Text>
                <View style={{ borderWidth: 1, borderColor: 'gray' }}></View>
                {data ? <FlatList
                    data={data}
                    renderItem={renderFavorite}
                    keyExtractor={item => item.id}
                /> : <Text style={{ marginTop: 50, fontWeight: 'bold', fontSize: 20, color: 'black' }}>No favorities yet</Text>}
            </View>
        </View>
    )
}

export default Profil
