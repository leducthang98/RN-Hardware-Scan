import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
    Modal,
    BackHandler
} from "react-native";
import { connect } from "react-redux";
import { resetStore, updateCommand, updateListUserId, updateSendCommand } from "../action/DefaultAction";
import { COMMON_STYLE } from "../common/style/CommonStyle";
import { CMD_GET_ALL_USER, getMessageWithCheckSum, sendMsg } from "../util/HardwareCalculator";
import { DataTable } from 'react-native-paper';
import { scale } from "../util/Scale";
import { windowHeight, windowWidth } from "../constant/Layout";
import { BLACK, GRAY_LIGHT, PRIMARY_COLOR, RED, WHITE } from "../constant/Colors";
import { Toast } from "native-base";

class AdminScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDialogVisible: false,
            idInputValue: ""
        }
    }

    componentDidMount() {
        sendMsg(CMD_GET_ALL_USER, this)
        BackHandler.addEventListener('hardwareBackPress', function () {
            console.log('a')
            return true;
          });
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
            >
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{ justifyContent: 'center' }} >ID</DataTable.Title>
                        <DataTable.Title style={{ justifyContent: 'center' }}>Hành động</DataTable.Title>
                    </DataTable.Header>
                    {
                        this.props.listIdUser.map((item, index) => {
                            let prefix = "000000"
                            let showDataItem = prefix.slice(item.toString().length) + item
                            return (

                                <DataTable.Row>
                                    <DataTable.Cell style={{ justifyContent: 'center' }} >
                                        <Text allowFontScaling={false} style={{ fontWeight: 'bold' }}>{showDataItem}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ justifyContent: 'center' }} >
                                        {item != '141295' && <Text
                                            onPress={() => {
                                                Alert.alert(
                                                    "Lưu ý",
                                                    "Xác nhận xoá ID:" + showDataItem,
                                                    [
                                                        { text: "Huỷ", onPress: () => console.log('Cancel Pressed') },
                                                        {
                                                            text: "Đồng ý", onPress: () => {
                                                                let msg = `(CMD:DELMS|MS:${parseInt(item) + parseInt(this.props.OTP)})`
                                                                let msgWithCheckSum = getMessageWithCheckSum(msg)
                                                                sendMsg(msgWithCheckSum, this)
                                                                let currentUserId = [...this.props.listIdUser]
                                                                const index = currentUserId.indexOf(item);
                                                                if (index > -1) {
                                                                    currentUserId.splice(index, 1);
                                                                }
                                                                this.props.updateListUserId(currentUserId)
                                                            }
                                                        }
                                                    ],
                                                    { cancelable: false }
                                                );
                                            }}
                                            allowFontScaling={false} style={{ fontWeight: 'bold', color: 'red' }}
                                        >Xoá</Text>}
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                        })
                    }
                </DataTable>
                {
                    this.props.listIdUser.length < 10 ? <TouchableOpacity
                        style={{
                            width: '80%',
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
                        onPress={() => {
                            this.setState({
                                ...this.state,
                                isDialogVisible: true
                            })
                        }}
                    >
                        <Text
                            allowFontScaling={false} style={{ fontSize: scale(14), fontWeight: 'bold', color: 'white' }}
                        >Thêm mã số</Text>
                    </TouchableOpacity> : null
                }
                {this.state.isDialogVisible && <Modal
                    animationType={'fade'}
                    transparent={true}
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#00000099",
                        position: "absolute",
                        width: windowWidth,
                        height: windowHeight,
                        paddingLeft: scale(5),
                        paddingRight: scale(5),

                    }}>
                        <View style={{ width: '80%', backgroundColor: WHITE, padding: scale(10), borderRadius: scale(15), justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                onChangeText={(id) =>
                                    this.setState({
                                        ...this.state,
                                        idInputValue: id,
                                    })
                                }
                                style={{ fontSize: scale(15) }}
                                keyboardType={'numeric'}
                                placeholder={"Nhập mã số"}
                            ></TextInput>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            ...this.state,
                                            idInputValue: "",
                                            isDialogVisible: false
                                        })
                                    }}
                                    style={{ width: '50%', justifyContent: 'center', alignItems: 'center', padding: scale(10) }} >
                                    <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: BLACK }}>Huỷ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={this.state.idInputValue.length !== 6}
                                    onPress={() => {
                                        if (!this.props.listIdUser.includes(parseInt(this.state.idInputValue))) {
                                            let msg = `(CMD:ADDMS|MS:${parseInt(this.state.idInputValue) + parseInt(this.props.OTP)})`
                                            let msgWithCheckSum = getMessageWithCheckSum(msg)
                                            sendMsg(msgWithCheckSum, this)
                                            let currentUserId = [...this.props.listIdUser, parseInt(this.state.idInputValue)]
                                            this.props.updateListUserId(currentUserId)
                                            this.setState({
                                                ...this.state,
                                                idInputValue: "",
                                                isDialogVisible: false
                                            })
                                        } else {
                                            Toast.show({
                                                text: 'ID đã tồn tại',
                                                position: "bottom",
                                                duration: 2000,
                                                type: 'danger'
                                            })
                                            this.setState({
                                                ...this.state,
                                                idInputValue: "",
                                                isDialogVisible: false
                                            })
                                        }

                                    }}
                                    style={{ width: '50%', justifyContent: 'center', alignItems: 'center', padding: scale(10) }} >
                                    <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: this.state.idInputValue.length !== 6 ? GRAY_LIGHT : BLACK }}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </Modal>}
            </ScrollView>
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
        },
        updateListUserId: (listUserId) => {
            dispatch(updateListUserId(listUserId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);
