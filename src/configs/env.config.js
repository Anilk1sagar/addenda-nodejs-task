
export default {
    
    isProduction: () => {
        return process.env.NODE_ENV.trim() === 'production' ? true : false;
    },
    apiPort: () => {
        return parseInt(process.env['API_PORT']);
    },
    mysqlHost: () => {
        return process.env.DB_HOST;
    },
    mysqlPort: () => {
        return process.env.DB_PORT;
    },
    mysqlDBName: () => {
        return process.env.DB_NAME;
    },
    mysqlUsername:()=>{
        return process.env.DB_USERNAME;
    },
    mysqlPassword: ()=>{
        return process.env.DB_PASSWORD;
    },
    DBType: ()=> {
        return process.env.DB_TYPE;
    },
    mongooseDBName: () => {
        return process.env.DB_NAME;
    },
    mongooseDBUsername:()=>{
        return process.env.DB_USERNAME;
    },
    // MongoDb Configs
    mongooseDBPassword: ()=>{
        return process.env.DB_PASSWORD;
    },
    mongooseDBHost: () => {
        return process.env.DB_HOST;
    },
    mongooseDBPort: () => {
        return process.env.DB_PORT;
    },
    mongooseDBSecret: () => {
        return process.env.DB_SECRET;
    },
    getMongooseDBUrl: () => {
        if(process.env.NODE_ENV === "production") {
            return process.env.DB_TYPE+'://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
        } else {
            // return process.env.DB_TYPE+'://'+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
            return process.env.DB_TYPE+'://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+process.env.DB_HOST+':'+process.env.DB_PORT+'/'+process.env.DB_NAME;
        }
    },
    // Token Configs
    jwtSecret:()=>{
        return process.env.JWT_SECRET;
    },
    webtokenSecretRefresh:()=>{
        return process.env.WEBTOKEN_SECRETKEY_REFRESHKEY;
    },
    webtokenSecretAccess:()=>{
        return process.env.WEBTOKEN_SECRETKEY_ACCESSKEY;
    },
    accessTokenExpire:()=>{
        return process.env.ACCESS_TOKEN_EXPIRE;
    }

};
