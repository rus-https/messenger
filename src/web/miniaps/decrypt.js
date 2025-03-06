import escapeHtmlOven from "../escapehtmloven.js"

export default async function decrypt(message,key) {
    let encryptText = CryptoJS.AES.decrypt(message, key)
    encryptText = encryptText.toString(CryptoJS.enc.Utf8)
    encryptText = escapeHtmlOven(encryptText)
    return encryptText
}