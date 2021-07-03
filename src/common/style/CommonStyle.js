import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');

export const COMMON_STYLE = StyleSheet.create({
    container: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent:'center',
    },
})