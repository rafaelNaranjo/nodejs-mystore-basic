const dataSourceStore = require("../../config/db.config");
const {Product} = require("../entities/product.entity")

class ProductRepository {

    async findAll(filter={take: 20, skip: 0}) {
        console.log(filter)
        const repository = await dataSourceStore.getRepository(Product);
        const [result, total ] = await repository.findAndCount(filter);
        return {
            data: result,
            total: total
        };
    }

    async findOne(id){
        const repository = await dataSourceStore.getRepository(Product);
        return await repository.findOne({where: {id: id}});
    }

    async save(product){
        const repository = await dataSourceStore.getRepository(Product);
        return await repository.save(product);
    }

    async update(id, product){
        const repository = await dataSourceStore.getRepository(Product);
        return await repository.update({id:id},product)
    }

    async delete(id){
        const repository = await dataSourceStore.getRepository(Product)
        return await repository.delete(id);
    }
}

module.exports = ProductRepository;