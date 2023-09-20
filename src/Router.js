import React, { useState, useEffect } from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import BottomTab from './navigator/BottomTab'
import Login from './Pages/Login'
import auth from "@react-native-firebase/auth"
import { useDispatch } from "react-redux"
import { update } from './context/Auth/AuthSlice'
LogBox.ignoreAllLogs()
const Router = () => {
    const user = auth().currentUser
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(update(user))
    }, [])
    return (
        <>
            {user ? <NavigationContainer>
                <BottomTab />
            </NavigationContainer>
                : <Login />}
        </>
    )
}

export default Router

