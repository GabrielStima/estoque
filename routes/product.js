const express = require('express');
const product = express.Router();

product.get('/status', function(req, res) {
    console.log('Products on');
});

module.exports = product;