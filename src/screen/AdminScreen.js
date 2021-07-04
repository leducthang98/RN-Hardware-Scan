import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image
} from "react-native";
import { connect } from "react-redux";
import { resetStore, updateCommand, updateSendCommand } from "../action/DefaultAction";
import { COMMON_STYLE } from "../common/style/CommonStyle";
import { CMD_GET_ALL_USER, sendMsg } from "../util/HardwareCalculator";

class AdminScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        sendMsg(CMD_GET_ALL_USER, this)
    }

    render() {
        return (
            <View style={[COMMON_STYLE.container]}>
                <Text>Command receive:{JSON.stringify(this.props.command)}</Text>
                <Text>Command send{JSON.stringify(this.props.sendCommand)}</Text>
                <Text>{JSON.stringify(this.props.listIdUser)}</Text>
            </View>
        )
    }
}
const mapStateToProps = (store) => {
    return {
        command: store.defaultReducer.command,
        OTP: store.defaultReducer.OTP,
        isActive: store.defaultReducer.isActive,
        sendCommand: store.defaultReducer.sendCommand,
        listIdUser: store.defaultReducer.listIdUser
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCommand: (command) => {
            dispatch(updateCommand(command))
        },
        updateSendCommand: (command) => {
            dispatch(updateSendCommand(command))
        },
        refreshStore: () => {
            dispatch(resetStore())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);
