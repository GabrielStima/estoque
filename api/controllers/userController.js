const uuid = require('../utils/uuid');
const cryptography = require('../utils/cryptography');
const authentication = require('../utils/authentication');
const userValidator = require('../validators/usersRoutes');

module.exports = app => {
    const usersDB = app.data.usersDB;
    const controller = {};

    controller.listUsers = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = usersDB.map(item => ({
            "id": item.id,
            "firstName": item.firstName,
            "lastName": item.lastName,
            "email": item.email,
            "phone": item.phone,
            "birthDate": item.birthDate,
            "profile": item.profile
        }))

        return res.status(200).send(
            response
        )
    };
    controller.findUser = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = usersDB.find(item => item.id === req.params.id)

        if (!response) {
            return res.status(404).send({
                message: "Data not found"
            })
        }

        delete response.password;

        return res.status(200).send(
            response
        )
    };
    controller.createUser = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const { error, value } = userValidator.createUser.validate(req.body);
        value.id = uuid.getUuid();
        value.password = cryptography.createHash(value.password);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        } else {
            return res.status(200).send(
                value
            )
        }
    }
    controller.updateUser = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const { error, value } = userValidator.updateUser.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        } else {
            const response = usersDB.find(item => {
                if (item.id === req.params.id) {
                    return res.status(200).send(value);
                }
            })

            if (!response) {
                return res.status(404).send({
                    message: "Data not found"
                })
            }
        }
    };
    controller.deleteUser = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = usersDB.find(item => {
            if (item.id === req.params.id) {
                return true
            }
        })

        if (!response) {
            return res.status(404).send({
                message: "Data not found"
            })
        }

        return res.status(204).send()
    };

    return controller;
}