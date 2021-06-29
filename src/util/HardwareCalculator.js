function checkSum(byteArray) {
    let data = 0x00
    for (let i = 0; i < byteArray.length; i++)
        data ^= byteArray[i].charCodeAt(0)
    return data
}



