const express = require('express');
const user = express.Router();

user.get('/status', function(req, res) {
    console.log('User on');
});

module.exports = user;