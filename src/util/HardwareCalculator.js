const CMD_ACK = "(CMD:ACK)*38"
const CMD_NACK = "(CMD:ACK)*38"
const CMD_SCAN = "(CMD:SCAN)*6E"
const CMD_GET_ALL_USER = "(CMD:GETMS)*39"

const checkSum = (msg) => {
    let data = 0x00
    console.log("msg:", msg)
    for (let i = 0; i < msg.length; i++)
        data ^= msg[i].charCodeAt(0)

    dataToUpperCase = data.toString(16).toUpperCase()
    if (dataToUpperCase.length == 1) {
        dataToUpperCase = "0" + dataToUpperCase
    }
    return dataToUpperCase
}

const getOTPHardware = (x, y, z) => {
    let hardwareID = (x - 1412) * (x - 1412) - y
    let OTP = hardwareID + z * 2
    return OTP
}

const getMessageActiveWithCheckSum = (userId, OTP) => {
    let finalId = userId + OTP
    let checkSumData = checkSum(`(MS:${finalId})`)
    return `(MS:${finalId})*${checkSumData}`
}

const getMessageWithCheckSum = (msg) => {
    return msg + "*" + checkSum(msg)
}

