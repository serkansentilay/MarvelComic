import { Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Config from 'react-native-config'
import firestore from "@react-native-firebase/firestore"
import { useSelector, useDispatch } from "react-redux"
import { signOutGoogle } from '../../context/Auth/AuthSlice'

const MarvelDetail = ({ route }) => {
    const { id } = route.params
    const { data, error, loading } = useFetch(`${Config.API_URL}id/${id}.json`)
    const { user } = useSelector(st => st.auth)
    const [value, setValue] = useState([])
    const dispatch = useDispatch()
    if (loading) {
        return <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 30, color: 'black' }}>Loading...</Text>

    }
    if (error) {
        return <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 30, color: 'black' }}>{error}</Text>

    }

    console.log("marvel detail data", data)
    console.log("user", user)

    const submitFirestore = async () => {
        const value = (await firestore().collection("Users").doc(user.uid).collection("Favorities").doc(`${id}`).get()).exists
        console.log("submitFirestore data", value)
        if (value) {
            Alert.alert("Error", "Already is favorited")
        } else {
            await firestore().collection("Users").doc(user.uid).collection("Favorities").doc(`${id}`).set({
                name: data.name,
                fullName: data.biography.fullName,
                image: data.images.lg,
                id: id
            })
            Alert.alert("Success", "Successfully is favorited")
        }

    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <TouchableOpacity onPress={submitFirestore}>
                    <Text style={{ marginLeft: 100, textAlign: 'right', fontSize: 30, color: 'blue', backgroundColor: 'lightblue' }}>SET TO FAVORITE</Text>
                </TouchableOpacity>
                <Image source={{ uri: data.images.lg }} resizeMode='contain' width={300} height={300} />
                <Text style={{ color: 'red', fontSize: 35, fontWeight: 'bold' }}>Name: {data.name}</Text>
                <Text style={{ color: 'orange', fontSize: 25, fontWeight: 'bold' }}>Biography</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>FullName: {data.biography.fullName}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>AlterEgos: {data.biography.alterEgos}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Aliases: {data.biography.aliases[0]}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>PlaceOfBirth: {data.biography.placeOfBirth}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>FirstAppearance: {data.biography.firstAppearance}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Publisher: {data.biography.publisher}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Alignment: {data.biography.alignment}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>work: {data.work.occupation}</Text>
                <Text style={{ color: 'orange', fontSize: 25, fontWeight: 'bold' }}>Connections</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Connections: {data.connections.groupAffiliation}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Relatives: {data.connections.relatives}</Text>
                <Text style={{ color: 'orange', fontSize: 25, fontWeight: 'bold' }}>Powerstats</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Intelligence: {data.powerstats.intelligence}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Strength: {data.powerstats.strength}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Speed: {data.powerstats.speed}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Durability: {data.powerstats.durability}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Power: {data.powerstats.power}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Combat: {data.powerstats.combat}</Text>
                <Text style={{ color: 'orange', fontSize: 25, fontWeight: 'bold' }}>Appearance</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Gender: {data.appearance.gender}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Race: {data.appearance.race}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Height: {data.appearance.height[0]}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>Weight: {data.appearance.weight[0]}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>EyeColor: {data.appearance.eyeColor}</Text>
                <Text style={{ color: 'purple', fontSize: 20, fontWeight: 'bold' }}>HairColor: {data.appearance.hairColor}</Text>
            </View>
        </ScrollView>
    )
}

export default MarvelDetail
