const jwt = require('jsonwebtoken');
const config = require('config');

const verifyToken = (token) => {
    try {
        jwt.verify(token, config.get('server.secret'));

        return true;
      } catch(err) {
        console.error(err)
        return false;
      }
}

module.exports = { verifyToken }
