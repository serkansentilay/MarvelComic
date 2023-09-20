import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profil from '../../Pages/Profil'
import Home from '../../Pages/Home'
import MarvelDetail from '../../Pages/MarvelDetail'
const StackHome = createNativeStackNavigator()
const StackProfile = createNativeStackNavigator()

export const HomeStack = () => {
    return (
        <StackHome.Navigator>
            <StackHome.Screen name='Home' component={Home} />
            <StackHome.Screen name='Detail' component={MarvelDetail} />
        </StackHome.Navigator>

    )
}

export const ProfileStack = () => {
    return (
        <StackProfile.Navigator>
            <StackProfile.Screen name='Profil' component={Profil} />
        </StackProfile.Navigator>

    )
}