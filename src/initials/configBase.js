import express from 'express';
import ExpressConfig from './expressConfig';
import ExpressLogConfig from './expressLogConfig';
import EnvConfig from './../configs/env.config';

export default {

    configure: async ()=> {
        
        let app = express();
        
        app = await ExpressConfig.configure(app,  EnvConfig.webtokenSecretAccess().trim());
        
        app = ExpressLogConfig.configure(app);

        // console.log(app);

        return app;
    }

};
