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
import { resetStore, updateCommand, updateSendCommand } from "../action/DefaultAction";
import { COMMON_STYLE } from "../common/style/CommonStyle";
import { GET_ALL_VEHICLE } from "../constant/EndPoint";
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
    }
    componentDidUpdate(prevProps) {
        if (this.props.qrCodeData !== prevProps.qrCodeData && this.props.qrCodeData) {
            Toast.show({
                text: 'Quét mã QR thành công (QR DATA:' + this.props.qrCodeData + ')',
                position: "bottom",
                duration: 2000,
                type: 'success'
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
                    {
                        this.props.qrCodeData ?
                            <TouchableOpacity
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
                                        isLoading: true
                                    })
                                    axios({
                                        method: 'GET',
                                        url: GET_ALL_VEHICLE,
                                        headers: {
                                            // qrsecret: '123456789',
                                            qrsecret: this.props?.qrCodeData,
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
                                            errorMessage: err?.response?.data?.message
                                        })
                                    })
                                }}
                            >
                                <Text
                                    allowFontScaling={false} style={{ fontSize: scale(14), fontWeight: 'bold', color: 'white' }}
                                >Truy nhập cơ sở dữ liệu</Text>
                            </TouchableOpacity>
                            : <TouchableOpacity
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
                                >Quét mã QR</Text>
                            </TouchableOpacity>
                    }
                    {
                        this.state.errorMessage !== null ? (
                            <Message
                                message={this.state.errorMessage || "Không thể truy nhập cơ sở dữ liệu"}
                                close={() => {
                                    this.setState({ errorMessage: null });
                                }}
                            />
                        ) : null
                    }
                </View>
            )
        }
        else {
            console.log('data:', this.state.selectingVehicleData)
            return (
                <ScrollView
                    contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
                >
                    <DataTable>
                        <DataTable.Header>
                            {
                                this.state.tableHead.map(item => <DataTable.Title >{item}</DataTable.Title>)
                            }
                        </DataTable.Header>
                        {
                            this.state.dataVehicle.map((item, index) => {
                                let prefixId = 'PT00000'
                                prefixId = prefixId.substring(0, prefixId.length - item?.id.toString().length);
                                return (
                                    <DataTable.Row
                                        onPress={() => {
                                            this.setState({
                                                ...this.state,
                                                selectingVehicleData: {
                                                    ...item,
                                                    id: prefixId + item?.id
                                                }
                                            })
                                        }}
                                    >
                                        <DataTable.Cell >{prefixId + item?.id}</DataTable.Cell>
                                        <DataTable.Cell >{item?.hotenChuXe}</DataTable.Cell>
                                        <DataTable.Cell >{item?.loaiPhuongTien}</DataTable.Cell>
                                        <DataTable.Cell >{item?.bienXe}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                        }

                    </DataTable>

                    <TouchableOpacity
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
                                dataVehicle: []
                            })
                        }}
                    >
                        <Text
                            allowFontScaling={false} style={{ fontSize: scale(14), fontWeight: 'bold', color: 'white' }}
                        >Quay lại</Text>
                    </TouchableOpacity>
                    <View style={{ width: scale(10), height: scale(20) }}></View>
                    {this.state.selectingVehicleData ?
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
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.selectingVehicleData?.id}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.WHITE, flexDirection: 'row' }}>
                                        <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Biển số xe:</Text>
                                        </View>
                                        <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.selectingVehicleData?.bienXe}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.GRAY_LIGHT, flexDirection: 'row' }}>
                                        <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Chủ sở hữu:</Text>
                                        </View>
                                        <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.selectingVehicleData?.hotenChuXe}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.WHITE, flexDirection: 'row' }}>
                                        <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Đăng ký:</Text>
                                        </View>
                                        <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.selectingVehicleData?.dangKy}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.GRAY_LIGHT, flexDirection: 'row' }}>
                                        <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Loại phương tiện:</Text>
                                        </View>
                                        <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.selectingVehicleData?.loaiPhuongTien}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.WHITE, flexDirection: 'row' }}>
                                        <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Màu sắc:</Text>
                                        </View>
                                        <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.selectingVehicleData?.mauXe}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.GRAY_LIGHT, flexDirection: 'row' }}>
                                        <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Ngày đăng kiểm:</Text>
                                        </View>
                                        <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.selectingVehicleData?.ngayDangKiem}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.WHITE, flexDirection: 'row' }}>
                                        <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Số khung:</Text>
                                        </View>
                                        <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.selectingVehicleData?.soKhung}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.GRAY_LIGHT, flexDirection: 'row' }}>
                                        <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Số máy:</Text>
                                        </View>
                                        <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.selectingVehicleData?.soMay}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.WHITE, flexDirection: 'row' }}>
                                        <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Ngày cấp:</Text>
                                        </View>
                                        <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.selectingVehicleData?.ngayCap}</Text>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%', height: scale(50), backgroundColor: Colors.GRAY_LIGHT, flexDirection: 'row' }}>
                                        <View style={{ width: '40%', height: '100%', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: scale(10) }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold' }}>Số lần gây tai nạn:</Text>
                                        </View>
                                        <View style={{ width: '60%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                            <Text allowFontScaling={false} style={{ fontSize: scale(15), fontWeight: 'bold', color: GRAY_FONTCOLOR }}>{this.state.selectingVehicleData?.soLanGayTaiNan}</Text>
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
                                            this.setState({
                                                ...this.state,
                                                selectingVehicleData: null
                                            })
                                        }}
                                    >
                                        <Text
                                            allowFontScaling={false} style={{ fontSize: scale(14), fontWeight: 'bold', color: 'white' }}
                                        >OK</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal> : null}
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);