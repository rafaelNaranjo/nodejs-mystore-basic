const express = require('express');
const fs = require("fs");

function routerApi(app){
    const router = express.Router();
    app.use('/api/v1', router);
    fs.readdir("./routes", (err, files)=> {
        if(err) console.error(err);
        files.forEach((filename)=> {
            const nameroute = filename.split(".")[0];
            router.use(`/${nameroute}`, require(`./${filename}`));
        })
    });
}

module.exports = routerApi;