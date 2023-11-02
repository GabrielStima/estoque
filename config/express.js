const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const consign = require('consign');

module.exports = () => {
    const app = express();

    app.set('port', process.env.PORT || config.get('server.port'));

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(morgan('dev'))

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization')
        next()
    })

    consign({cwd: 'api'})
        .then('data')
        .then('controllers')
        .then('routes')
        .into(app)

    app.get('/status', (req, res) => res.send('OK'));

    return app;
};