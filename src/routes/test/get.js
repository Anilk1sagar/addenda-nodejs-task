import Express from 'express';
import _ from 'lodash';

// Interfaces
import { DbMongoTest } from './../../mongoose/interface';


/**
 * Routes Test Get
 * 
 * @param {Express} app - Express app
 */
export default function (app) {

    const dbMongoTest = DbMongoTest(app);



    /**
     * Get All
     * 
     * @param {Express.Request} req - HTTP request context.
     * @param {Express.Response} res - HTTP response context.
     * @param {Express.NextFunction} next - Next Function.
     */
    const getAll = async (req, res, next) => {

        const { id, offset, limit } = req.query;

        try {

            const dbObject = await dbMongoTest.getAll(offset, limit);
            console.log('all tests get: ', dbObject);

            return res.status(200).json(dbObject);

        } catch (e) {
            next(e);
        }

    };



    /**
     * Get Auth test
     * 
     * @param {Express.Request} req - HTTP request context.
     * @param {Express.Response} res - HTTP response context.
     * @param {Express.NextFunction} next - Next Function.
     */
    const getAuth = async (req, res, next) => {

        console.log('req user:', req.user);

        try {

            return res.status(200).json({
                tested: true
            });

        } catch (e) {
            next(e);
        }

    };


    return {
        getAll: getAll,
        getAuth: getAuth,
    };

};
