import Express from 'express';
import EnvConfig from './../configs/env.config';
import logger from './../utils/logger';


/**
 * Error Handler
 * 
 * @param {any} err - Error.
 * @param {Express.Request} req - HTTP request context.
 * @param {Express.Response} res - HTTP response context.
 * @param {Express.NextFunction} next - Next Function.
 */
export default function errorHandler(err, req, res, next) {

    logger.info(`*********************** errorHandler started **********************`);

    console.log('working error');

    if (!err) return res.sendStatus(500);

    const error = {
        message: err.message || 'Internal Server Error',
    };


    error.stack = (EnvConfig.isProduction()) ? {} : err.stack;

    if (err.errors) {

        error.errors = {};

        const { errors } = err;

        for (const type in errors) {
            if (type in errors) {
                error.errors[type] = errors[type].message;
            }
        }
    }

    console.log(err);
    logger.debug('error middleware {}', err);
    res.status(err.code || 500).json(error);

};
