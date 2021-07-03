import React, { PureComponent } from 'react'
import {
    Dimensions,
    View,
    ActivityIndicator,
    Text,
    StyleSheet,
    Modal
} from 'react-native'
import { scale, scaleModerate, scaleVertical } from '../util/Scale';
import { BLACK, PRIMARY_COLOR } from '../constant/Colors';


class Loading extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.loadingArea, { paddingVertical: scaleVertical(15), paddingHorizontal: scaleModerate(15) }]}>
                    <ActivityIndicator color={PRIMARY_COLOR} size={"large"} />
                    <Text allowFontScaling={false} style={{
                        fontSize: scale(15),
                        color: BLACK,
                        flex: 1,
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginLeft: scaleModerate(10)
                    }}>{(this.props.message || "Vui lòng chờ")}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#00000099",
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    loadingArea: {
        backgroundColor: 'white',
        borderRadius: scaleModerate(5),
        flexDirection: 'row',
        width: '80%'
    }
})

export default Loading
