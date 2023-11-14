const uuid = require('../utils/uuid');
const cryptography = require('../utils/cryptography');
const authentication = require('../utils/authentication');
const userValidator = require('../validators/usersRoutes');
const authValidator = require('../validators/authRoutes');

module.exports = app => {
    const usersDB = app.data.usersDB;
    const controller = {};

    controller.listUsers = (req, res) => res.status(200).json(usersDB);
    controller.findUser = (req, res) => res.status(200).json(usersDB);
    controller.createUser = (req, res) => {
        const token = req.headers['authorization'];
        const { error } = authValidator.headerValidate.validate({'authorization': token});
        const validateToken = authentication.verifyToken(token);

        if (!token || error || !validateToken) {
            return res.status(401).json({ 
                status: "error",
                error: "Error of autentication"
            });
        } else {
            const { error, value } = userValidator.createUser.validate(req.body);
            value.id = uuid.getUuid();
            value.password = cryptography.createHash(value.password);
            console.log(value)
    
            if (error) {
                return res.status(400).json({ 
                    status: "error",
                    error: error.details[0].message 
                });
              } else {
                return res.send({
                    status: "success",
                    data: value
                })            
              }   
        }     
    }
    controller.updateUser = (req, res) => res.status(200).json(usersDB);
    controller.deleteUser = (req, res) => res.status(200).json(usersDB);

    return controller;
}