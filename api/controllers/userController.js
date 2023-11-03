const validator = require('../validators/usersRoutes');

module.exports = app => {
    const usersDB = app.data.usersDB;
    const controller = {};

    controller.listUsers = (req, res) => res.status(200).json(usersDB);
    controller.findUser = (req, res) => res.status(200).json(usersDB);
    controller.login = (req, res) => res.status(200).json(usersDB);
    controller.createUser = (req, res) => {
        const { error, value } = validator.createUser.validate(req.body);

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