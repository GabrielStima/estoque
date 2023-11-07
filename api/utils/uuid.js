const { v4: uuidv4 } = require('uuid');

const getUuid = () => uuidv4();

module.exports = { getUuid }

