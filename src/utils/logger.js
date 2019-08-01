import * as fs from 'fs';
import path from 'path';
import EnvConfig from './../configs/env.config';

const winston = require('winston');
const logDir = path.join(__dirname, './../../logs');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleTimeString();

const logger = winston.createLogger({
    level: 'verbose',
    format: winston.format.combine(
        winston.format.colorize({message: true}),
        winston.format.simple()
    ),
    transports: [

        // colorize the output to the console
        new (winston.transports.Console)({
            colorize: true,
            timestamp: tsFormat,
            level: 'info',
            handleExceptions: true
        }),

        new (require('winston-daily-rotate-file'))({
            colorize: true,
            filename: `${logDir}/.log`,
            timestamp: tsFormat,
            datePattern: 'dd-MM-yyyy',
            prepend: true,
            level: EnvConfig.isProduction ?  'info': 'verbose',
            handleExceptions: true
        }),

        //loggingWinston
    ],
    exitOnError: false
});




logger.info('Success message');
logger.warn('Warning message');
logger.error('Error info');

export default logger;