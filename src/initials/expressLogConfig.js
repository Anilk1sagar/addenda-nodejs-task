import Express from 'express';
import logger from './../utils/logger';
const expressWinston = require('express-winston');


export default {

    /**
     * Express Log Config
     * 
     * @param {Express.Application} app - Express app
     */
    configure: (app) => {

        app.use(expressWinston.logger({
            winstonInstance: logger
        }));

        return app;
    }
}
