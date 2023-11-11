const jwt = require('jsonwebtoken');
const config = require('config');

const verifyToken = (token) => {
    try {
        const validate = jwt.verify(token, config.get('server.secret'));
        console.log(validate)
        if (validate.exp > Date.now()) {
            throw new Error('JWT is expired');
        }

        return true;

      } catch(err) {
        return err;
      }
}

module.exports = { verifyToken }
