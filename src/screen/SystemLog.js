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
import { COMMON_STYLE } from "../common/style/CommonStyle";
import { ROUTER } from "../navigator/RouterName";
import { CommonActions } from '@react-navigation/native';
import { GREEN, WHITE } from "../constant/Colors";
import { DataTable } from 'react-native-paper';
import axios from "axios";
import { GET_ALL_LOG } from "../constant/EndPoint";
import { scale } from "../util/Scale";

class SystemLog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            commandLog: []
        }
    }

    componentDidMount() {
        axios({
            method: 'GET',
            url: GET_ALL_LOG,
        }).then(data => {
            this.setState({
                commandLog: data?.data?.data
            })
        }).catch(err => {
            console.log(err.response)
        })
    }

    render() {
        return (
            <ScrollView
                contentContainerStyle={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
            >
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{ justifyContent: 'center' }} >MS</DataTable.Title>
                        <DataTable.Title style={{ justifyContent: 'center' }}>Lệnh</DataTable.Title>
                        <DataTable.Title style={{ justifyContent: 'center' }}>Thời gian</DataTable.Title>
                    </DataTable.Header>
                    {
                        this.state.commandLog.map((item, index) => {
                            return (
                                <DataTable.Row
                                >
                                    <DataTable.Cell style={{ justifyContent: 'center' }} >
                                        <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: scale(10) }}>  {item?.user}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ justifyContent: 'center' }}>
                                        <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: scale(10), color: GREEN }}>  {item?.command}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell style={{ justifyContent: 'center' }} >
                                        <Text allowFontScaling={false} style={{ fontWeight: 'bold', fontSize: scale(10) }}>  {item?.timestamp}</Text>
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                        })
                    }
                </DataTable>
            </ScrollView>
        )
    }
}

export default SystemLog;