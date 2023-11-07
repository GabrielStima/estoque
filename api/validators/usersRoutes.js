const Joi = require('joi');

const listUsers = Joi.object();
const findUser = Joi.object({});
const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required()
});
const createUser = Joi.object({
    firstName: Joi.string().max(16).required(),
    lastName: Joi.string().max(16).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(11).pattern(/^[0-9]+$/),
    password: Joi.string().min(8).max(16).required(),
    birthDate: Joi.string(),
    occupation: Joi.string().required()
});
const updateUser = Joi.object();
const deleteUser = Joi.object();

module.exports = { listUsers, findUser, createUser, updateUser, deleteUser, login }