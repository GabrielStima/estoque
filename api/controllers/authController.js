const jwt = require('jsonwebtoken');
const config = require('config');
const cryptography = require('../utils/cryptography');
const validator = require('../validators/authRoutes');

module.exports = app => {
    const usersDB = app.data.usersDB;
    const controller = {};

    controller.login = async (req, res) => {
        const { error, value } = validator.login.validate(req.body);
    
        if (error) {
            return res.status(400).json({
                status: "error",
                error: error.details[0].message
            });
        } else {
            const getUser = () => {
                return usersDB;
            }
    
            const user = getUser();
            
            if (await cryptography.comparePass(value.password, user[0].password)) {
                return res.send({
                    status: "success",
                    data: {
                        token: jwt.sign({ id: user[0].id }, config.get('server.secret'), {
                            expiresIn: "1h"
                          })
                    }
                }) 
            } else {
                return res.status(400).json({
                    status: "Fail",
                    data: "Dados incorretos"
                });
            }
        } 
    };

    return controller;
}