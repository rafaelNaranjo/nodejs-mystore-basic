const cors = require('cors');

function corsConfiguratino(app){
    let whitelist = '*';
    if(process.env.WHITELIST){
        whitelist = process.env.WHITELIST.split(",");
    }
    const corsOptions = {
        origin: (origin, callback)=>{
            if(!origin || whitelist.includes(origin)){
                callback(null, true);
            }else{
                callback(new Error("Not orgin allowed"));
            }
        }
    }
    app.use(cors(corsOptions));
}

module.exports = corsConfiguratino;
