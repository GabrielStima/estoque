const uuid = require('../utils/uuid');
const authentication = require('../utils/authentication');
const productValidator = require('../validators/productsRoutes');

module.exports = app => {
    const productsDB = app.data.productsDB;
    const controller = {};

    controller.listProducts = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = productsDB.map(item => ({
            "id": item.id,
            "title": item.title,
            "price": item.price,
            "stock": item.stock,
            "brand": item.brand,
            "category": item.category
        }))

        return res.status(200).send(
            response
        )
    };
    controller.findProduct = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = productsDB.find(item => {
            if (item.id === req.params.id) {
                return {
                    "id": item.id,
                    "title": item.title,
                    "price": item.price,
                    "stock": item.stock,
                    "brand": item.brand,
                    "category": item.category
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
    controller.createProduct = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const { error, value } = productValidator.createProduct.validate(req.body);
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
    controller.updateProduct = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const { error, value } = productValidator.updateProduct.validate(req.body);

        if (error) {
            return res.status(400).json({
                message: error.details[0].message
            });
        } else {
            const response = productsDB.find(item => {
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
    controller.deleteProduct = (req, res) => {
        authentication.validateToken(req.headers['authorization'], res);

        const response = productsDB.find(item => {
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