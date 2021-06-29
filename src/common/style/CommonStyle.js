import { StyleSheet, Dimensions } from "react-native";

const { containerW, containerH } = Dimensions.get('window');

export const COMMON_STYLE = StyleSheet.create({
    container: {
        width: containerW,
        height: containerH,
        alignItems: 'center',
    },
})