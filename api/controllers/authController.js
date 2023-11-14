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
                            expiresIn: 120
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

    controller.validateToken = (req, res) => {
        const token = req.headers['authorization'];
        const { error } = authValidator.headerValidate.validate({'authorization': token});

        if (error) {
            return res.status(400).json({
                status: "error",
                error: error.details[0].message
            });
        } else {
            const validateToken = authentication.verifyToken(token);

            if(!validateToken){
                return res.status(401).json({
                    status: "error",
                    data: validateToken
                });
            }

            return res.status(200).json({
                status: "sucess",
                data: validateToken
            });
        }
    };

    return controller;
}