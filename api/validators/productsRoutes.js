const Joi = require('joi');

const createProduct = Joi.object({
    title: Joi.string().max(25).required(),
    description: Joi.string().max(255).required(),
    price: Joi.number().integer().required(),
    stock: Joi.number().integer().required(),
    brand: Joi.string().max(25).required(),
    category: Joi.string().max(25).required()
});
const updateProduct = Joi.object({
    title: Joi.string().max(25),
    description: Joi.string().max(255),
    price: Joi.number().integer(),
    stock: Joi.number().integer(),
    brand: Joi.string().max(25),
    category: Joi.string().max(25)
});

module.exports = { createProduct, updateProduct}