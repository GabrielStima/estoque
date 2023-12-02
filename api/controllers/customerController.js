const uuid = require('../utils/uuid');
const authentication = require('../utils/authentication');
const customerValidator = require('../validators/customerRoutes');

module.exports = app => {
    const customerDB = app.data.customerDB;
    const controller = {};

    controller.listCustomers = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = customerDB.map(item => ({
            "firstName": item.firstName,
            "lastName": item.lastName,
            "email": item.email,
            "phone": item.phone,
            "birthDate": item.birthDate,
            "id": item.id
        }))

        return res.status(200).send(
            response
        )
    };
    controller.findCustomer = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = customerDB.find(item => {
            if (item.id === req.params.id) {
                return {
                    "firstName": item.firstName,
                    "lastName": item.lastName,
                    "email": item.email,
                    "phone": item.phone,
                    "birthDate": item.birthDate,
                    "id": item.id
                }
            }
        })

        if (!response) {
            return res.status(404).send({
                message: "Data not found"
            })
        }

        return res.status(200).send(
            response
        )
    };
    controller.createCustomer = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const { error, value } = customerValidator.createCustomer.validate(req.body);
        value.id = uuid.getUuid();

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        } else {
            return res.status(200).send(
                value
            )
        }
    };
    controller.updateCustomer = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const { error, value } = customerValidator.updateCustomer.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        } else {
            const response = customerDB.find(item => {
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
    controller.deleteCustomer = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = customerDB.find(item => {
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




