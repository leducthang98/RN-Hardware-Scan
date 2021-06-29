import React, { Component } from "react";
import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { connect } from "react-redux";
import { updateCommand } from "../action/DefaultAction";
import { COMMON_STYLE } from "../common/style/CommonStyle";
import { scale } from "../util/Scale";
class LoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            command: null
        }
    }

    componentDidMount() {
        this.demoInterval = setInterval(() => {
            let data = Math.random();
            this.props.updateCommand(data);
        }, 1000)

    }

    componentWillUnmount() {
        clearInterval(this.demoInterval)
    }

    // handlerCommandChange() {
    //     if (this.checkSum(this.state.command)) {
    //         setTimeout(() => {
    //             this.sendACK()
    //         }, 100)

    //     } else {
    //         setTimeout(() => {
    //             this.sendNACK()
    //         }, 100)
    //     }
    // }

    // checkSum(command) {
    //     return false;
    // }

    // sendACK() {
    //     console.log("ACK sent")
    // }

    // sendNACK() {
    //     console.log("NACK sent")
    // }

    componentDidUpdate(prevProps) {
        if (this.props.command == prevProps.command) {
            console.log("same command")
        } else {
            console.log("new command")
        }
    }

    render() {
        return (
            <View style={COMMON_STYLE.container}>
                <Text>Command:{this.props.command}</Text>
                <TouchableOpacity style={{ backgroundColor: 'red', width: scale(100), height: scale(30) }}>
                    <Text>Authenticate</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        command: store.defaultReducer.command,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateCommand: (command) => {
            dispatch(updateCommand(command))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);