const express = require('express');
const ProductsServices = require('./../services/products.services');
const validatorHandler = require('./../middleware/validation.handler');
const { getProductSchema, createProductSchema, updateProductSchema } = require('./../schemes/product.scheme');

const router = express.Router();
const services = new ProductsServices();

router.get('/', async (req, res) => {
    const products = await services.find();
    res.json(products)
});

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await services.findOne(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.post("/", validatorHandler(createProductSchema, 'body'),async (req, res) => {
    const body = req.body;
    const newProduct = await services.create(body);
    res.status(201).json({
        message: "Created",
        data: newProduct
    });
});

router.put("/:id", validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'),async (req, res, next) => {
   const { id } = req.params;
   const changes = req.body;
    try{
        const productUpdate = await services.update(id, changes);
        res.status(200 ).json(productUpdate);
    }catch (err){
        next(err);
    }
});

router.patch("/:id", async (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    try{
        const productUpdate = await services.update(id, changes);
        res.status(200 ).json(productUpdate);
    }catch (err){
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    const { id } = req.params;
    try{
        const idDelete = await services.delete(id);
        res.json(idDelete);
    }catch (err){
        next(err);
    }
});

module.exports = router