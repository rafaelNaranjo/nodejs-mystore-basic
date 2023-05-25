const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require("./middleware/error.handler")

const app = express();

app.use(express.json());
const whitelist = ['http://localhost:8080', 'http://localhost:3000']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
    console.log(`mi sevidor esta escuchando por el puerto ${port}`);
});