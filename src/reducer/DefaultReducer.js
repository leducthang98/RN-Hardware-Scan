import { getOTPHardware } from "../util/HardwareCalculator"

const DEFAULT_STATE = {
    command: "NO COMMAND",
    OTP: null,
    isActive: false,
    listUsers: [],
    qrCodeData: "",
    sendCommand: "",
    listIdUser: []
}
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_COMMAND': {
            let command = action.payload
            if (command.includes("ID")) {
                let split1 = command.split(')')
                let split2 = split1[0].split(':')
                let xyz = split2[1].split(',')
                let OTP = getOTPHardware(xyz[0], xyz[1], xyz[2])
                return {
                    ...state,
                    command: action.payload,
                    OTP: OTP
                }
            } else if (command.includes("CMD:ACTIVE")) {
                return {
                    ...state,
                    command: action.payload,
                    isActive: true
                }
            } else if (command.includes("(DATA:")) {
                let split1 = command.split(')')
                //(DATA:asdas)*123
                qrData = split1[0].slice(6)
                return {
                    ...state,
                    command: action.payload,
                    qrCodeData: qrData
                }

            } else if (command.includes("(CMD:DATA|MS:") && !command.includes("END")) {
                let split1 = command.split(')')
                //(CMD:DATA|MS:1234,1235)*checksum\n [0]
                listIdUser = split1[0].slice(13)
                listIdUserArr = listIdUser.split(',')

                for (let i = 0; i < listIdUserArr.length; i++) {
                    listIdUserArr[i] -= state.OTP
                }

                return {
                    ...state,
                    command: action.payload,
                    listIdUser: listIdUserArr
                }
            } else {
                return {
                    ...state,
                    command: action.payload,
                }
            }
        }
        case 'SEND_COMMAND': {
            return {
                ...state,
                sendCommand: action.payload
            }
        }
        case 'RESET_STORE': {
            return {
                command: "NO COMMAND",
                OTP: null,
                isActive: false,
                listUsers: [],
                qrCodeData: "",
                sendCommand: "",
                listIdUser: []
            }
        }

    }
    return state;
}
