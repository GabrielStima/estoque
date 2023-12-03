const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const consign = require('consign');
const cors = require('cors');

module.exports = () => {
    const app = express();

    app.set('port', process.env.PORT || config.get('server.port'));

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(morgan('dev'))

    app.use(cors());

    consign({cwd: 'api'})
        .then('data')
        .then('controllers')
        .then('routes')
        .into(app)

    app.get('/status', (req, res) => res.send('OK'));

    return app;
};