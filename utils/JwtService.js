const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config');

class JwtService {
    static getJwtToken(payload) {
        payload = JSON.stringify(payload);
        return jwt.sign(payload, SECRET_KEY);
    }

    static verifyJwtToken(token) {
        return jwt.verify(token, SECRET_KEY);
    }
}

module.exports = JwtService; 