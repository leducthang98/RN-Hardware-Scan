import React, { Component } from "react";
import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { connect } from "react-redux";
import { resetStore, updateCommand, updateSendCommand } from "../action/DefaultAction";
import { COMMON_STYLE } from "../common/style/CommonStyle";
import { CMD_SCAN, sendMsg } from "../util/HardwareCalculator";

class MainScreen extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {

    }
    render() {
        return (
            <View style={COMMON_STYLE.container}>
                <Text>Main Screen</Text>
                <Text>Command:{this.props.command}</Text>
                <Text>SendCommand:{this.props.sendCommand}</Text>
                <Text>QR data:{this.props.qrCodeData}</Text>
                <TouchableOpacity
                    onPress={() => {
                        sendMsg(CMD_SCAN, this)
                    }}
                >
                    <Text>Scan</Text>
                </TouchableOpacity>
                {
                    this.props.qrCodeData ?
                        <TouchableOpacity>
                            <Text>Access DB</Text>
                        </TouchableOpacity>
                        : null
                }
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
        qrCodeData: store.defaultReducer.qrCodeData
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

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);