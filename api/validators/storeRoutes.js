const Joi = require('joi');

const createStore = Joi.object({
    cnpj: Joi.string().max(14).required(),
    name: Joi.string().max(255).required(),
    address: Joi.string().max(255).required(),
    idCustomer: Joi.string().max(36).required()
});
const updateStore = Joi.object({
    cnpj: Joi.string().max(14),
    name: Joi.string().max(255),
    address: Joi.string().max(255),
    idCustomer: Joi.string().max(36)
});

module.exports = { createStore, updateStore}