const Joi = require('joi');

const createUser = Joi.object({
    firstName: Joi.string().max(16).required(),
    lastName: Joi.string().max(16).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    password: Joi.string().min(8).max(16).required(),
    birthDate: Joi.string().required(),
    occupation: Joi.string().required()
});
const updateUser = Joi.object({
    firstName: Joi.string().max(16).required(),
    lastName: Joi.string().max(16).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    password: Joi.string().min(8).max(16).required(),
    birthDate: Joi.string().required(),
    occupation: Joi.string().required()
});

module.exports = { createUser, updateUser }