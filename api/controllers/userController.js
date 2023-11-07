const uuid = require('../utils/uuid');
const cryptography = require('../utils/cryptography');
const validator = require('../validators/usersRoutes');

module.exports = app => {
    const usersDB = app.data.usersDB;
    const controller = {};

    controller.listUsers = (req, res) => res.status(200).json(usersDB);
    controller.findUser = (req, res) => res.status(200).json(usersDB);
    controller.login = (req, res) => {
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
    
            if (cryptography.comparePass(value.password, user[0].password)) {
                return res.send({
                    status: "success",
                    data: "ASDASDASDASDAS"
                }) 
            } else {
                return res.status(400).json({ 
                    status: "error",
                    error: error.details[0].message 
                });
            }
        } 
    };
    controller.createUser = (req, res) => {
        const { error, value } = validator.createUser.validate(req.body);
        value.id = uuid.getUuid();
        value.password = cryptography.createHash(value.password);

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
    controller.updateUser = (req, res) => res.status(200).json(usersDB);
    controller.deleteUser = (req, res) => res.status(200).json(usersDB);

    return controller;
}