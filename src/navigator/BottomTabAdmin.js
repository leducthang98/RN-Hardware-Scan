import * as React from 'react';
import {
    Image,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdminScreen from '../screen/AdminScreen';
import { ROUTER } from './RouterName';
import SystemLog from '../screen/SystemLog';
import { GRAY_FONTCOLOR, PRIMARY_COLOR, WHITE } from '../constant/Colors';
import { size } from '../constant/CommonStyles';
const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    let iconNameGray;
                    if (route.name === ROUTER.MAIN_ADMIN) {
                        iconName = require('../res/image/homePressed.png');
                        iconNameGray = require('../res/image/home.png');
                    } else if (route.name === ROUTER.SYSTEM_LOG) {
                        iconName = require('../res/image/notiPressed.png');
                        iconNameGray = require('../res/image/noti.png');
                    }
                    return (
                        <Image
                            style={focused ? size.smd : size.sm}
                            source={(focused ? iconName : iconNameGray)}
                            resizeMode={'contain'}
                        />

                    );
                },
            })}
            tabBarOptions={{
                inactiveTintColor: GRAY_FONTCOLOR,
                activeTintColor: PRIMARY_COLOR,
                style: {
                    shadowColor: PRIMARY_COLOR,
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    backgroundColor: WHITE,
                    elevation: 5,

                },
                labelPosition: 'below-icon',
                showLabel: false,
                showIcon: true,
           }}>
        
            <Tab.Screen name={ROUTER.MAIN_ADMIN} component={AdminScreen} options={{ tabBarLabel: "Home" }} />
            <Tab.Screen name={ROUTER.SYSTEM_LOG} component={SystemLog} options={{ tabBarLabel: "System" }} />
        </Tab.Navigator>
    );
}
