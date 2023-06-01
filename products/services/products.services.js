const {faker} = require("@faker-js/faker");
const boom = require('@hapi/boom');
const ProductRepository = require("../repository/product.repository");

class ProductsServices{

    constructor() {
        this.productRepository = new ProductRepository()
    }

    async create(data){
        const newProduct = {
            id: faker.string.uuid(),
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }
    async find(){
        return await this.productRepository.findAll();
    }

    async findOne(id){
        const product = await this.productRepository.findOne(id);
        if (!product) {
            throw boom.notFound('product not found');
        }
        if (product.isBlock) {
            throw boom.conflict('product is block');
        }
        return product;
    }

    async update(id, changes){
        const index = this.products.findIndex(item=> item.id === id);
        if (index === -1) {
            throw boom.notFound('product not found');
        }
        this.products[index] = {
            ...this.products[index],
            ...changes
        }
        return this.products[index];
    }

    async delete(id){
        const index = this.products.findIndex(item=> item.id === id);
        if (index === -1) {
            throw boom.notFound('product not found');
        }
        this.products.splice(index,1);
        return { id };
    }

}

module.exports = ProductsServices;