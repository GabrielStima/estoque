const Joi = require('joi');

const createCustomer = Joi.object({
    firstName: Joi.string().max(16).required(),
    lastName: Joi.string().max(16).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    birthDate: Joi.string().required()
});
const updateCustomer = Joi.object({
    firstName: Joi.string().max(16),
    lastName: Joi.string().max(16),
    email: Joi.string().email(),
    phone: Joi.string().length(11).pattern(/^[0-9]+$/),
    birthDate: Joi.string()
});

module.exports = { createCustomer, updateCustomer}