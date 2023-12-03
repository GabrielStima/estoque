const jwt = require('jsonwebtoken');
const config = require('config');
const cryptography = require('../utils/cryptography');
const authValidator = require('../validators/authRoutes');
const authentication = require('../utils/authentication');

module.exports = app => {
    const usersDB = app.data.usersDB;
    const controller = {};

    controller.login = async (req, res) => {
        const { error, value } = authValidator.login.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        } else {
            const getUser = () => {
               return usersDB.find(element => {
                    if (element.email === value.email) {
                        return element
                    }
                });
            }

            const user = getUser();
            if (await cryptography.comparePass(value.password, user.password)) {
                return res.status(200).json({
                    token: jwt.sign({ ...user }, config.get('server.secret'), {
                        expiresIn: 300
                    }),
                    ref: user.id,
                    per: user.profile
                })
            } else {
                return res.status(400).json({
                    message: "invalid data"
                });
            }
        }
    };

    controller.validateToken = (req, res) => {
        const token = req.headers['authorization'];
        const { error } = authValidator.headerValidate.validate({ 'authorization': token });

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        } else {
            const isValid = authentication.verifyToken(token);

            if (!isValid) {
                return res.status(401).json({
                    isValid
                });
            }

            return res.status(200).json({
                isValid
            });
        }
    };

    return controller;
}