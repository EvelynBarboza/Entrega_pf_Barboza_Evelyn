const jwt = require ('jsonwebtoken');

const PRIVATE_KEY = 'coderSecret'
const generateToken = user => jwt.sign(user, PRIVATE_KEY, {expiresIn: '24h'})

module.exports = {
    PRIVATE_KEY, generateToken
}