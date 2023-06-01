require("reflect-metadata")
let EntitySchema = require("typeorm").EntitySchema

const Product = new EntitySchema({
    name: "Product",
    tableName: "product",
    columns: {
        id: {
            primary: true,
            type: "uuid",
            generated: true
        },
        name: {
            type: "varchar"
        },
        description: {
            type: "text"
        },
        price: {
            type: "double precision"
        },
        image: {
            type: "varchar",
            length: 400
        },
        isBlock:{
            name: "is_blocked",
            type: "boolean"
        }
    }
});

module.exports = {
    Product
};