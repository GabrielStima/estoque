const jwt = require('jsonwebtoken');
const config = require('config');
const authValidator = require('../validators/authRoutes');

const verifyToken = (token) => {
  try {
    jwt.verify(token, config.get('server.secret'));

    return true;
  } catch (err) {
    console.error(err)
    return false;
  }
}

const validateToken = (token, res) => {
  const { error } = authValidator.headerValidate.validate({ 'authorization': token });
  const validateToken = verifyToken(token);

  if (!token || error || !validateToken) {
    return res.status(401).json({
      status: "error",
      error: "Error of autentication"
    });
  }
}

module.exports = { verifyToken, validateToken }
