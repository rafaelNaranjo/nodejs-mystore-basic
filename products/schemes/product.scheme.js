const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(100);
const price = Joi.number().min(1);
const description = Joi.string();
const image = Joi.string().uri();
const isBlock = Joi.boolean();

const createProductSchema = Joi.object({
    name: name.required(),
    description: description,
    price: price.required(),
    image: image
});

const updateProductSchema = Joi.object({
    name: name,
    description: description,
    price: price,
    image: image,
    isBlock: isBlock
});
const getProductSchema = Joi.object({
    id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema }