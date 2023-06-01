const dataSourceStore = require("../../config/db.config");

class ProductRepository {

    async findAll(filter={take: 20, skip: 0}) {
        const repository = await dataSourceStore.getRepository("Product");
        const [result, total ] = await repository.findAndCount(filter);
        return {
            data: result,
            total: total
        };
    }

    async findOne(id){
        try {
            const repository = await dataSourceStore.getRepository("Product");
            return await repository.findOne({where: {id: id}});
        }catch (err){
            throw err;
        }
    }
}

module.exports = ProductRepository;