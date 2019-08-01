import path from 'path';
import dotenv from 'dotenv';
import dotenvSafe from 'dotenv-safe';
import EnvConfig from './configs/env.config';

export default {

    init: ()=> {

        // Environment Directory
        console.log(path.join(__dirname, '.env'));

        // Environment Setup
        console.log('Node env: ', process.env.NODE_ENV);
        let configPath = path.join(__dirname,'./../.env.'+ process.env.NODE_ENV.trim());
        console.log('Node env: ', process.env.NODE_ENV);


        const result = dotenv.config({path: configPath});
        dotenvSafe.load({allowEmptyValues: true});
        // console.log(result);
        
        console.log('dotenv isProduction?: ', EnvConfig.isProduction());
        // console.log('Firebase DB Ref: ', EnvConfig.firebaseDbRef());
        
    }
}