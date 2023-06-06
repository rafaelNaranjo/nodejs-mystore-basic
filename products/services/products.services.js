const boom = require('@hapi/boom');
const ProductRepository = require("../repository/product.repository");
const {Between, ILike} = require("typeorm");

class ProductsServices{

    constructor() {
        this.productRepository = new ProductRepository()
    }

    async create(product){
        return this.productRepository.save(product);
    }
    async find(valuesfilter){
        const {id, name, pricemin=0, pricemax=100000, limit:take, offset:skip} = valuesfilter;
        const filter = {
            where: {
                id,
                name: ILike(`%${name}%`),
                price: Between(pricemin, pricemax)
            },
            take,
            skip
        }
        return await this.productRepository.findAll(filter);
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
        return this.productRepository.update(id, changes);
    }

    async delete(id){
        return await this.productRepository.delete(id);
    }

}

module.exports = ProductsServices;