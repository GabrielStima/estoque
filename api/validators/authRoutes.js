const Joi = require('joi');

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required()
});
const headerValidate = Joi.object({authorization: Joi.string().required()})

module.exports = { login, headerValidate }