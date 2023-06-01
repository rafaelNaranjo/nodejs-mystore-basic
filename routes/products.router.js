const express = require('express');
const {ProductsServices, schema} = require('./../products');
const validatorHandler = require('./../middleware/validation.handler');

const router = express.Router();
const services = new ProductsServices();

router.get('/', async (req, res,next) => {
    try {
        const { ...valuesfilter } = req.query;
        const products = await services.find(valuesfilter);
        res.json(products)
    }catch (err) {
        next(err);
    }
});

router.get('/:id', validatorHandler(schema.getProductSchema, 'params'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await services.findOne(id);
        res.json(product);
    } catch (error) {
        next(error);
    }
});

router.post("/", validatorHandler(schema.createProductSchema, 'body'),async (req, res, next) => {
    try{
        const body = req.body;
        const newProduct = await services.create(body);
        res.status(201).json({
            message: "Created",
            data: newProduct
        });
    }catch (err){
        next(err);
    }
});

router.put("/:id", validatorHandler(schema.getProductSchema, 'params'), validatorHandler(schema.updateProductSchema, 'body'),async (req, res, next) => {
   const { id } = req.params;
   const changes = req.body;
    try{
        const productUpdate = await services.update(id, changes);
        res.status(200 ).json(productUpdate);
    }catch (err){
        next(err);
    }
});

router.patch("/:id", validatorHandler(schema.getProductSchema, "params"), validatorHandler(schema.updateProductSchema,"body") ,async (req, res, next) => {
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