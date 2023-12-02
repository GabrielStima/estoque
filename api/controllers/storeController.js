const uuid = require('../utils/uuid');
const authentication = require('../utils/authentication');
const storeValidator = require('../validators/storeRoutes');

module.exports = app => {
    const storeDB = app.data.storeDB;
    const controller = {};

    controller.listStores = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = storeDB.map(item => ({
            "id": item.id,
            "cnpj": item.cnpj,
            "name": item.name,
            "address": item.address,
            "customerId": item.customerId
        }))

        return res.status(200).send(
            response
        )
    };
    controller.listStoresByCustomerId = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = storeDB.filter(item => {
            if (item.customerId === req.params.customerId) {
                return {
                    "id": item.id,
                    "cnpj": item.cnpj,
                    "name": item.name,
                    "address": item.address,
                    "customerId": item.customerId
                }
            }
        })

        return res.status(200).send(
            response
        )
    };
    controller.findStore = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = storeDB.find(item => {
            if (item.id === req.params.id) {
                return {
                    "id": item.id,
                    "cnpj": item.cnpj,
                    "name": item.name,
                    "address": item.address,
                    "customerId": item.customerId
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
    controller.createStore = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const { error, value } = storeValidator.createStore.validate(req.body);
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
    controller.updateStore = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const { error, value } = storeValidator.updateStore.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        } else {
            const response = storeDB.find(item => {
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
    controller.deleteStore = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = storeDB.find(item => {
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





