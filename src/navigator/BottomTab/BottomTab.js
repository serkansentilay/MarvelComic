import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack, ProfileStack } from '../Stack/Stack';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: '#e91e63',
                headerShown: false
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeStack}
                options={{ tabBarLabel: 'Home', }}
            />
            <Tab.Screen
                name="ProfileTab"
                component={ProfileStack}
                options={{ tabBarLabel: 'Profile', }}
            />
        </Tab.Navigator>
    );
}