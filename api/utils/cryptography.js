const bcrypt = require('bcrypt');

const createHash = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}

const comparePass = (password, hash) => {
    if (cryptography.comparePass(password, hash)) {
        return true;
    }else{
        return false;
    }
}

module.exports = { createHash, comparePass }
