const Joi = require('joi');

const createUser = Joi.object({
    firstName: Joi.string().max(16).required(),
    lastName: Joi.string().max(16).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(11).pattern(/^[0-9]+$/),
    password: Joi.string().min(8).max(16).required(),
    birthDate: Joi.string(),
    occupation: Joi.string().required()
});
const updateUser = Joi.object({
    firstName: Joi.string().max(16),
    lastName: Joi.string().max(16),
    email: Joi.string().email(),
    phone: Joi.string().length(11).pattern(/^[0-9]+$/),
    password: Joi.string().min(8).max(16),
    birthDate: Joi.string(),
    occupation: Joi.string()
});

module.exports = { createUser, updateUser }