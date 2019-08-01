Promise = require('bluebird');
import http from 'http';
import ConfigBase from './initials/configBase';
import logger from './utils/logger';
import EnvConfig from './configs/env.config';
import EnvSetup from './env_setup';

// Environment Setup
EnvSetup.init();

// ====================== Server Configurations =====================//

console.log('Server PORT: ', process.env.API_PORT);

let server = {};

ConfigBase.configure().then((app) => {

    // console.log(app);
    server = http.createServer(app);

    server.listen(EnvConfig.apiPort(), () => {
        console.log('Server is Listening on ', EnvConfig.apiPort());
    });
}).catch((error) => {
    _logErrorAndExit('unable to start', error);
});



/**
 * Log Error And Exit
 * 
 * @param {string} message 
 * @param {string} err 
 */
function _logErrorAndExit(message, err) {

    console.error('message|| ', message);
    console.error('error|| ', err);

    logger.debug('error __logErrorAndExit {}', err);
    
    setTimeout(function () {
        process.exit();
    }, 3000);
};
