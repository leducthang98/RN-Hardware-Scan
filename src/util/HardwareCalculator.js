import { RNSerialport } from "react-native-serialport"

export const CMD_ACK = "(CMD:ACK)*38\n"
export const CMD_NACK = "(CMD:NACK)*38\n"
export const CMD_SCAN = "(CMD:SCAN)*6E\n"
export const CMD_GET_ALL_USER = "(CMD:GETMS)*39\n"

export const checkSum = (msg) => {
    let data = 0x00
    for (let i = 0; i < msg.length; i++)
        data ^= msg[i].charCodeAt(0)

    dataToUpperCase = data.toString(16).toUpperCase()
    if (dataToUpperCase.length == 1) {
        dataToUpperCase = "0" + dataToUpperCase
    }
    return dataToUpperCase
}

export const getOTPHardware = (x, y, z) => {
    let hardwareID = (x - 1412) * (x - 1412) - y
    let OTP = hardwareID + z * 2
    return OTP
}

export const getMessageActiveWithCheckSum = (userId, OTP) => {

    let finalId = parseInt(userId) + parseInt(OTP)
    let checkSumData = checkSum(`(MS:${finalId})`)
    return `(MS:${finalId})*${checkSumData}\n`
}

export const getMessageWithCheckSum = (msg) => {
    return msg + "*" + checkSum(msg)
}

export const sendMsg = (msg, context) => {
    setTimeout(() => {
        context?.props?.updateSendCommand(msg)
        RNSerialport.writeString(msg)
    }, 500)
}