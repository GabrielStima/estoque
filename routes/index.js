const express = require('express');
const userRoutes = require('./user');
const productsRoutes = require('./product');
const router = express.Router();

router.get('/status', function(req, res) {
    console.log('API on');
});


module.exports = {router, userRoutes, productsRoutes};