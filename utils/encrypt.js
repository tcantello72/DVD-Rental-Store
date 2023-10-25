require('dotenv').config()
const crypto = require('crypto')

const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')

const algo = 'aes-256-cbc'

function encrypt(plainText) {
  const data = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algo, key, data)
  let encryptedText = cipher.update(plainText, 'utf8', 'hex')
  encryptedText += cipher.final('hex')
  return data.toString('hex') + ':' + encryptedText
}

function decrypt(input) {
  const parts = input.split(':')
  const data = Buffer.from(parts[0], 'hex')
  const encryptedText = parts[1]
  const decipher = crypto.createDecipheriv(algo, key, data)
  let decryptedText = decipher.update(encryptedText, 'hex', 'utf-8')
  decryptedText += decipher.final('utf8')
  return decryptedText
}

module.exports = { encrypt, decrypt }