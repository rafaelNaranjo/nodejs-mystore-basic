require('dotenv').config();
const express = require('express');
const corsConfiguratino = require('./config/cors.config');
const routerApi = require('./routes');
const registerMiddleware = require('./middleware');

const app = express();

app.use(express.json());
corsConfiguratino(app);
routerApi(app);
registerMiddleware(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`mi sevidor esta escuchando por el puerto ${port}`);
});