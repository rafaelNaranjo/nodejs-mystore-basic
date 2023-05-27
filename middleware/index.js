const {boomErrorHandler,errorHandler,logErrors} = require("./error.handler")

function registerMiddlewares(app){
    app.use(logErrors);
    app.use(boomErrorHandler);
    app.use(errorHandler);
}

module.exports = registerMiddlewares