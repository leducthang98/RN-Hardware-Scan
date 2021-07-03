import React, { Component } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    DeviceEventEmitter
} from "react-native";
import { connect } from "react-redux";
import { resetStore, updateCommand, updateSendCommand } from "../action/DefaultAction";
import { COMMON_STYLE } from "../common/style/CommonStyle";
import { checkSum, CMD_ACK, CMD_NACK, getMessageActiveWithCheckSum, sendMsg } from "../util/HardwareCalculator";
import { RNSerialport, definitions, actions } from "react-native-serialport";
import { scale } from "../util/Scale";
import { TextInput } from "react-native-gesture-handler";
import { ROUTER } from "../navigator/RouterName";
import Loading from "../component/Loading";
import Message from "../component/Message";
import RNRestart from 'react-native-restart';
import { Toast } from "native-base";
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
            checkSumMsg: "",
            isLoading: false,
            errorMessage: null
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
                this.stopUsbListener();
                RNRestart.Restart()
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
                this.stopUsbListener();
                RNRestart.Restart()
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

    componentDidUpdate(prevProps) {
        if (this.props.OTP != null && prevProps.OTP !== this.props.OTP) {
            Toast.show({
                text: 'Kết nối thiết bị thành công',
                position: "bottom",
                duration: 2000,
                type: 'success'
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            return <Loading></Loading>
        } else {
            return (
                <View style={COMMON_STYLE.container}>
                    <TextInput
                        onChangeText={(id) =>
                            this.setState({
                                ...this.state,
                                idInputValue: id,
                            })
                        }
                        placeholder={'Nhập mã ID'}
                        style={{
                            width: '80%',
                            height: scale(47),
                            fontSize: scale(15),
                            textAlign: 'left',
                            paddingVertical: scale(10),
                            paddingHorizontal: scale(10),
                            borderWidth: scale(1),
                            borderRadius: scale(10),
                            marginTop: scale(-30),
                            shadowColor: "#325B8C",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            backgroundColor: 'white'
                        }} />
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                isLoading: true
                            })
                            let msgActive = getMessageActiveWithCheckSum(this.state.idInputValue, this.props.OTP) || ""
                            sendMsg(msgActive, this)
                            setTimeout(() => {
                                this.setState({
                                    ...this.state,
                                    isLoading: false
                                })
                                if (this.props.isActive) {
                                    this.props.navigation.navigate(ROUTER.MAIN_USER)
                                } else {
                                    this.setState({
                                        ...this.state,
                                        errorMessage: "Đăng nhập thất bại, vui lòng thử lại"
                                    })
                                }
                            }, 2000);
                        }}
                        style={{
                            width: '50%',
                            height: scale(45),
                            marginTop: scale(10),
                            borderRadius: scale(20),
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: "#325B8C",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3.84,
                            elevation: 5,
                            backgroundColor: '#24a0ed'
                        }}
                    >
                        <Text allowFontScaling={false} style={{ fontSize: scale(14), fontWeight: 'bold', color: 'white' }}>Đăng nhập</Text>
                    </TouchableOpacity>
                    {
                        this.state.errorMessage !== null ? (
                            <Message
                                message={this.state.errorMessage || "Đăng nhập thất bại"}
                                close={() => {
                                    this.setState({ errorMessage: null });
                                }}
                            />
                        ) : null
                    }
                </View>
            )
        }
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
        },
        refreshStore: () => {
            dispatch(resetStore())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);