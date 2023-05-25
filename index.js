const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require("./middleware/error.handler")

const app = express();

app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
    console.log(`mi sevidor esta escuchando por el puerto ${port}`);
});