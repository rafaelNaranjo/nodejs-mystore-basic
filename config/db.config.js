require("reflect-metadata");
const typeorm = require("typeorm");
const {Product} = require("./../products/entities/product.entity");
const DbExceptions = require("./../exceptions/db.exceptions");

class DataSourceStore {
    constructor() {
        this.connection = null;
        this.generateConnection();
    }
    async generateConnection(){
        const conn =  await new typeorm.DataSource({
            type: process.env.DB_TYPE,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: false,
            logging: true,
            entities: [Product]
        }).initialize();

        if(conn.isInitialized){
            this.connection = conn;
        } else {
            console.error("Connection database err", conn);
            return null;
        }
    };
    async getRepository(name){
        if(!this.connection) throw new DbExceptions("Connections is not initialized");
        return await this.connection.getRepository(name);
    };
}
const dataSourceStore = new DataSourceStore();

module.exports = dataSourceStore;
