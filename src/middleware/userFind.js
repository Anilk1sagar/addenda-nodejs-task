import Express from 'express';
import _ from 'lodash';


// Interfaces
import { DbMongoUser } from '../mongoose/interface';


/**
 * Request User Find Middleware
 * 
 * @param {Express.Application} app - Express app
 */
export default (app) => {

    const dbMongoUser = DbMongoUser(app);

    
    /**
     * Express middleware function
     * 
     * @param {Express.Request} req - HTTP request context
     * @param {Express.Response} res - HTTP response context
     * @param {Express.NextFunction} next - Next Function
     */
    const find = async (req, res, next) => {

        // console.log('req.user: ', req.user);

        console.log('req.user: ', req.user);

        if (_.isEmpty(req.user)) {
            return res.boom.unauthorized('Invalid User');
        }
        
        // console.log("req.user: ", req.user);
        
        const user = await dbMongoUser.getById(req.user.uid);
        // console.log('findUser: ', user);
        
        if (_.isEmpty(user)) {
            return res.boom.unauthorized('Invalid User');
        }

        // console.log(user);

        req.user = user;

        return next();

    };



    return {
        findUser: find
    };

};
