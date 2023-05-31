
const {createProductSchema, updateProductSchema, getProductSchema} = require("./schemes/product.scheme")
const ProductsServices = require("./services/products.services")

module.exports = {
    schema: {
        createProductSchema,
        updateProductSchema,
        getProductSchema
    },
    ProductsServices
}