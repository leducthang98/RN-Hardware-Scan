import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "../screen/SplashScreen";
import LoginScreen from "../screen/LoginScreen";
import { ROUTER } from "./RouterName";


const Stack = createStackNavigator();

function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ROUTER.SPLASH_SCREEN} headerMode={'none'}>
                <Stack.Screen name={ROUTER.SPLASH_SCREEN} component={SplashScreen} />
                <Stack.Screen name={ROUTER.LOGIN_SCREEN} component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigator;