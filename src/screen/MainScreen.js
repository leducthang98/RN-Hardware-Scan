import axios from "axios";
import React, { Component } from "react";
import {
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    Modal
} from "react-native";
import { connect } from "react-redux";
import { resetStore, updateCommand, updateQRData, updateSendCommand } from "../action/DefaultAction";
import { COMMON_STYLE } from "../common/style/CommonStyle";
import { GET_ALL_VEHICLE, GET_BY_QRCODE } from "../constant/EndPoint";
import { CMD_SCAN, sendMsg } from "../util/HardwareCalculator";
import { scale } from "../util/Scale";
import Message from "../component/Message";
import { Table, Row, Rows } from 'react-native-table-component';
import { windowWidth, windowHeight } from "../constant/Layout";
import { DataTable } from 'react-native-paper';
import Colors, { GRAY_FONTCOLOR, GRAY_LIGHT, PRIMARY_COLOR, WHITE } from "../constant/Colors";
import { Toast } from "native-base";
class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataVehicle: [],
            isLoading: false,
            errorMessage: null,
            tableHead: ['Mã số', 'Chủ sở hữu', 'Phương tiện', 'Biển số'],
            selectingVehicleData: null
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            console.log('a')
            return true;
        });
        // setTimeout(() => {
        //     this.props.updateCommand('(DATA:123)*1B\n')
        // }, 5000)
    }
    componentDidUpdate(prevProps) {
        if (this.props.qrCodeData !== prevProps.qrCodeData && this.props.qrCodeData) {
            this.setState({
                ...this.state,
                isLoading: true
            })
            axios({
                method: 'GET',
                url: GET_BY_QRCODE,
                params: {
                    qrcode: this.props.qrCodeData
                }
            }).then((data) => {
                this.setState({
                    ...this.state,
                    isLoading: false,
                    dataVehicle: data?.data?.data
                })
            }).catch((err) => {
                this.setState({
                    ...this.state,
                    errorMessage: "Biển số chưa được đăng ký"
                })
            })
        }
    }
    renderVehicles() {
        return (
            <View style={{ width: windowWidth, height: scale(100), marginTop: scale(10), backgroundColor: 'red' }}>

            </View>
        )
    }
    render() {
        if (this.state.dataVehicle.length == 0) {
            return (
                <View style={COMMON_STYLE.container}>
                    <TouchableOpacity
                        style={{
                            width: '70%',
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
                            sendMsg(CMD_SCAN, this)
                        }}
                    >
                        <Text
                            allowFontScaling={false} style={{ fontSize: scale(14), fontWeight: 'bold', color: 'white' }}
                        >Scan</Text>
                    </TouchableOpacity>

                    {
                        this.state.errorMessage !== null ? (
                            <Message
                                message={this.state.errorMessage || "Không thể truy nhập cơ sở dữ liệu"}
                                close={() => {
                                    this.props.updateQrData("")
                                    this.setState({
                                        ...this.state,
                                        dataVehicle: [],
                                        errorMessage: null
                                    });
                                }}
                            />
                        ) : null
                    }
                </View>
            )
        }
        else {
            return (
                <ScrollView
                    contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
                >
                    <View style={{ width: scale(10), height: scale(20) }}></View>
                    <Modal
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
                            <View
                                style={{ width: '100%', height: '100%', backgroundColor: WHITE, alignItems: 'center' }}>

                                <View style={{ width: '100%', height: scale(10) }}>
                                </View>
                                <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.GRAY_LIGHT, flexDirection: 'row' }}>
                                    <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>ID:</Text>
                                    </View>
                                    <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.dataVehicle[0]?.id}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.WHITE, flexDirection: 'row' }}>
                                    <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Biển số xe:</Text>
                                    </View>
                                    <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.dataVehicle[0]?.bienXe}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.GRAY_LIGHT, flexDirection: 'row' }}>
                                    <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Chủ sở hữu:</Text>
                                    </View>
                                    <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.dataVehicle[0]?.hotenChuXe}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.WHITE, flexDirection: 'row' }}>
                                    <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Đăng ký:</Text>
                                    </View>
                                    <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.dataVehicle[0]?.dangKy}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.GRAY_LIGHT, flexDirection: 'row' }}>
                                    <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Loại phương tiện:</Text>
                                    </View>
                                    <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.dataVehicle[0]?.loaiPhuongTien}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.WHITE, flexDirection: 'row' }}>
                                    <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Màu sắc:</Text>
                                    </View>
                                    <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.dataVehicle[0]?.mauXe}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.GRAY_LIGHT, flexDirection: 'row' }}>
                                    <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Ngày đăng kiểm:</Text>
                                    </View>
                                    <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.dataVehicle[0]?.ngayDangKiem}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.WHITE, flexDirection: 'row' }}>
                                    <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Số khung:</Text>
                                    </View>
                                    <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.dataVehicle[0]?.soKhung}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.GRAY_LIGHT, flexDirection: 'row' }}>
                                    <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Số máy:</Text>
                                    </View>
                                    <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.dataVehicle[0]?.soMay}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.WHITE, flexDirection: 'row' }}>
                                    <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Ngày cấp:</Text>
                                    </View>
                                    <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.dataVehicle[0]?.ngayCap}</Text>
                                    </View>
                                </View>
                                <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.GRAY_LIGHT, flexDirection: 'row' }}>
                                    <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Số lần gây tai nạn:</Text>
                                    </View>
                                    <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                        <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.dataVehicle[0]?.soLanGayTaiNan}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        marginTop: scale(15),
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
                                        this.props.updateQrData("")
                                        this.setState({
                                            ...this.state,
                                            dataVehicle: [],

                                        })
                                    }}
                                >
                                    <Text
                                        allowFontScaling={false} style={{ fontSize: scale(14), fontWeight: 'bold', color: 'white' }}
                                    >Quay lại</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            )
        }
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
        },
        updateQrData: () => {
            dispatch(updateQRData())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);