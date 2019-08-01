import Express from 'express';
import _ from 'lodash';


// Interfaces
import { DbMongoTest } from './../../mongoose/interface';


/**
 * Routes Test Add
 * 
 * @param {Express} app - Express app
 */
export default function (app) {

    const dbMongoTest = DbMongoTest(app);


    /**
     * Add Test
     * 
     * @param {Express.Request} req - HTTP request context.
     * @param {Express.Response} res - HTTP response context.
     * @param {Express.NextFunction} next - Next Function.
     */
    const add = async (req, res, next) => {
        
        req.checkBody('name', 'Enter a valid name').isAscii();

        let errors = await req.validationErrors();
        if (errors) {
            errors = _.first(errors);
            const errValidation = {
                code: 400,
                message: errors.msg
            };
            return next(errValidation);
        }

        // console.log(req.user);

        const { name } = req.body;
        
        try {

            const dbModel = {
                name: name
            };
    
            console.log('dbModel is: ', dbModel);

            const dbObject = await dbMongoTest.add(dbModel);

            console.log('Test added: ', dbObject);   

            return res.status(200).json(dbObject);

        } catch (e) {
            next(e);
        }
    };





    return {
        add: add
    };

};
