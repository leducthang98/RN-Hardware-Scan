import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { COMMON_STYLE } from "../common/style/CommonStyle";
import { ROUTER } from "../navigator/RouterName";
import { CommonActions } from '@react-navigation/native';

class SplashScreen extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        setTimeout(() => {
            this.props?.navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: ROUTER.LOGIN_SCREEN }],
                }),
            );
        }, 1500);
    }
    render() {
        return (
            <View style={COMMON_STYLE.container}>
                <Text>Splash Screen</Text>
            </View>
        )
    }
}

export default SplashScreen;