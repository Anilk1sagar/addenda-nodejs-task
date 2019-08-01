import Express from 'express';
import _ from 'lodash';

// Interfaces
import { DbMongoContact } from './../../mongoose/interface';


/**
 * Routes Contact Get
 * 
 * @param {Express} app - Express app
 */
export default function (app) {

    const dbMongoContact = DbMongoContact(app);



    /**
     * Get All Contacts
     * 
     * @param {Express.Request} req - HTTP request context.
     * @param {Express.Response} res - HTTP response context.
     * @param {Express.NextFunction} next - Next Function.
     */
    const getAll = async (req, res, next) => {

        const { offset, limit } = req.query;

        console.log('req user: ', req.user);

        try {

            const dbObject = await dbMongoContact.getAll(offset, limit, req.user._id);
            console.log('All contacts get: ', dbObject);

            return res.status(200).json(dbObject);

        } catch (e) {
            next(e);
        }

    };



    return {
        getAll: getAll
    };

};
