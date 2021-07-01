import React, { Component } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    DeviceEventEmitter
} from "react-native";
import { connect } from "react-redux";
import { updateCommand, updateSendCommand } from "../action/DefaultAction";
import { COMMON_STYLE } from "../common/style/CommonStyle";
import { checkSum, CMD_ACK, CMD_NACK, getMessageActiveWithCheckSum, sendMsg } from "../util/HardwareCalculator";
import { RNSerialport, definitions, actions } from "react-native-serialport";
import { scale } from "../util/Scale";
import { TextInput } from "react-native-gesture-handler";
class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            command: null,
            servisStarted: false,
            connected: false,
            usbAttached: false,
            output: "",
            outputArray: [],
            baudRate: "115200",
            interface: "-1",
            sendText: "HELLO",
            returnedDataType: definitions.RETURNED_DATA_TYPES.HEXSTRING,
            idInputValue: "",
            sumMsg: "",
            checkSumMsg: ""
        }
        this.startUsbListener = this.startUsbListener.bind(this);
        this.stopUsbListener = this.stopUsbListener.bind(this);
    }

    componentDidMount() {
        this.startUsbListener()
    }

    startUsbListener() {
        console.log(1)
        DeviceEventEmitter.addListener(
            actions.ON_SERVICE_STARTED,
            (data) => {

            },
            this
        );
        console.log(2)
        DeviceEventEmitter.addListener(
            actions.ON_SERVICE_STOPPED,
            (data) => {

            },
            this
        );
        console.log(3)
        DeviceEventEmitter.addListener(
            actions.ON_DEVICE_ATTACHED,
            (data) => {

            },
            this
        );
        DeviceEventEmitter.addListener(
            actions.ON_DEVICE_DETACHED,
            (data) => {

            },
            this
        );
        DeviceEventEmitter.addListener(
            actions.ON_ERROR,
            (data) => {

            },
            this
        );
        DeviceEventEmitter.addListener(
            actions.ON_CONNECTED,
            (data) => {

            },
            this
        );
        DeviceEventEmitter.addListener(
            actions.ON_DISCONNECTED,
            (data) => {

            },
            this
        );
        DeviceEventEmitter.addListener(actions.ON_READ_DATA, this.onReadData, this);
        RNSerialport.setReturnedDataType(this.state.returnedDataType);
        RNSerialport.setAutoConnectBaudRate(parseInt(this.state.baudRate, 10));
        RNSerialport.setInterface(parseInt(this.state.interface, 10));
        RNSerialport.setAutoConnect(true);
        RNSerialport.startUsbService();
    };

    stopUsbListener = async () => {
        DeviceEventEmitter.removeAllListeners();
        const isOpen = await RNSerialport.isOpen();
        if (isOpen) {
            Alert.alert("isOpen", isOpen);
            RNSerialport.disconnect();
        }
        RNSerialport.stopUsbService();
    };

    onReadData(data) {
        let payload = ""
        if (this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.INTARRAY) {
            payload = RNSerialport.intArrayToUtf16(data.payload);
        } else if (this.state.returnedDataType === definitions.RETURNED_DATA_TYPES.HEXSTRING) {
            payload = RNSerialport.hexToUtf16(data.payload);
        }
        this.setState({
            ...this.state,
            command: payload
        })

        // remove \n
        payload = payload.slice(0, payload.length - 1)

        if (!payload.includes('ACK') && !payload.includes('NACK')) {

            // get 2 sum element
            let sumMsg = payload.slice(-2).toUpperCase()

            // checksum msg
            let checkSumMsg = checkSum(payload.slice(0, payload.length - 3))
            this.setState({
                ...this.state,
                sumMsg: sumMsg,
                checkSumMsg: checkSumMsg
            })

            if (sumMsg != checkSumMsg) {
                sendMsg(CMD_NACK, this)
            } else {
                this.props.updateCommand(payload);
                sendMsg(CMD_ACK, this)
            }
        }
    }

    onError(error) {
        console.error(error);
    }

    componentWillUnmount() {
        this.stopUsbListener();
    }

    render() {
        return (
            <View style={COMMON_STYLE.container}>
                <Text>SumMsg:{this.state.sumMsg}</Text>
                <Text>CheckSumMsg:{this.state.checkSumMsg}</Text>
                <Text>StateCommand:{this.state.command}</Text>
                <Text>Command:{this.props.command}</Text>
                <Text>SendCommand:{this.props.sendCommand}</Text>
                <TouchableOpacity
                    onPress={() => {
                        sendMsg(CMD_NACK, this)
                    }}
                    style={{ backgroundColor: 'red', width: scale(100), height: scale(30) }}>
                    <Text>{this.props.OTP || "waiting for OTP"}</Text>
                </TouchableOpacity>

                <TextInput
                    onChangeText={(id) =>
                        this.setState({
                            ...this.state,
                            idInputValue: id,
                        })
                    }
                    placeholder={'Enter Your ID'}
                    style={{ width: scale(100), height: scale(50), backgroundColor: 'red', marginTop: scale(30) }} />
                <TouchableOpacity style={{ width: scale(50), height: scale(50), backgroundColor: 'yellow', marginTop: scale(10) }} onPress={() => {
                    msgActive = getMessageActiveWithCheckSum(this.state.idInputValue, this.props.OTP)
                    sendMsg(msgActive, this)
                }}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <Text>{'Is active:' + this.props.isActive}</Text>
            </View>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        command: store.defaultReducer.command,
        OTP: store.defaultReducer.OTP,
        isActive: store.defaultReducer.isActive,
        sendCommand: store.defaultReducer.sendCommand
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateCommand: (command) => {
            dispatch(updateCommand(command))
        },
        updateSendCommand: (command) => {
            dispatch(updateSendCommand(command))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);