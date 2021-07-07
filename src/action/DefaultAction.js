export function updateCommand(payload) {
    return ({
        type: "UPDATE_COMMAND",
        payload
    })
}

export function resetStore(payload) {
    return ({
        type: "RESET_STORE",
        payload
    })
}

export function updateSendCommand(payload) {
    return ({
        type: "SEND_COMMAND",
        payload
    })
}

export function updateListUserId(payload) {
    return ({
        type: "UPDATE_LIST_USER_ID",
        payload
    })
}

export function updateQRData(payload) {
    return ({
        type: "UPDATE_QRDATA",
        payload
    })
}