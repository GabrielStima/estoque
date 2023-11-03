import Joi from 'joi';

const listProducts = Joi.object();
const findProduct = Joi.object();
const createProduct = Joi.object();
const updateProduct = Joi.object();
const deleteProduct = Joi.object();

export { listProducts, findProduct, createProduct, updateProduct, deleteProduct }