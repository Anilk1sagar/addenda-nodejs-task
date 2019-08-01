import Express from 'express';
import _ from 'lodash';


// Interfaces
import { DbMongoContact } from './../../mongoose/interface';


/**
 * Routes Contact
 * 
 * @param {Express} app - Express app
 */
export default function (app) {

    const dbMongoContact = DbMongoContact(app);


    /**
     * Add Contact
     * 
     * @param {Express.Request} req - HTTP request context.
     * @param {Express.Response} res - HTTP response context.
     * @param {Express.NextFunction} next - Next Function.
     */
    const add = async (req, res, next) => {
        
        req.checkBody('name', 'Enter a valid name').isAscii();
        req.checkBody('phone', 'Enter a valid phone').isAscii();

        let errors = await req.validationErrors();
        if (errors) {
            errors = _.first(errors);
            const errValidation = {
                code: 400,
                message: errors.msg
            };
            return next(errValidation);
        }

        console.log(req.user);

        let { name, phone } = req.body;
        phone = parseInt(phone);
        
        try {

            /* Check Contact if already exist */
            const contact = await dbMongoContact.getByName(name);
            if (!_.isEmpty(contact)) {
                return res.boom.notAcceptable('Contact already exist with given name');
            }

            const dbModel = {
                userId: req.user._id,
                name: name,
                phone: phone
            };
    
            console.log('dbModel is: ', dbModel);

            const dbObject = await dbMongoContact.add(dbModel);

            console.log('Contact added: ', dbObject);   

            return res.status(200).json(dbObject);

        } catch (e) {
            next(e);
        }
    };


    /**
     * Update Contact
     * 
     * @param {Express.Request} req - HTTP request context.
     * @param {Express.Response} res - HTTP response context.
     * @param {Express.NextFunction} next - Next Function.
     */
    const update = async (req, res, next) => {
        
        req.checkParams('id', 'Enter a valid id').isAscii();

        let errors = await req.validationErrors();
        if (errors) {
            errors = _.first(errors);
            const errValidation = {
                code: 400,
                message: errors.msg
            };
            return next(errValidation);
        }

        console.log(req.user);

        let { id } = req.params;

        let { name, phone } = req.body;
        if (phone) phone = parseInt(phone);
        
        try {

            /* Check Contact if already exist */
            const contact = await dbMongoContact.getById(id);
            if (_.isEmpty(contact)) {
                return res.boom.notAcceptable('Contact does not exist with given id');
            }

            if (contact.userId.toString() !== req.user._id.toString()) {
                return res.boom.notAcceptable('Contact does not belong to requested user');
            }

            if (!_.isEmpty(name)) {
                const contact = await dbMongoContact.getByName(name);
                if (!_.isEmpty(contact)) {
                    return res.boom.notAcceptable('Contact already exist with given name');
                }
            }

            const dbModel = {
                name: name,
                phone: phone
            };
    
            console.log('dbModel is: ', dbModel);

            const isUpdated = await dbMongoContact.update(id, dbModel);

            console.log('Contact updated: ', isUpdated);

            return res.status(200).json({isUpdated: isUpdated});

        } catch (e) {
            next(e);
        }
    };


    /**
     * Update Contact
     * 
     * @param {Express.Request} req - HTTP request context.
     * @param {Express.Response} res - HTTP response context.
     * @param {Express.NextFunction} next - Next Function.
     */
    const remove = async (req, res, next) => {
        
        req.checkParams('id', 'Enter a valid id').isAscii();

        let errors = await req.validationErrors();
        if (errors) {
            errors = _.first(errors);
            const errValidation = {
                code: 400,
                message: errors.msg
            };
            return next(errValidation);
        }

        console.log(req.user);

        let { id } = req.params;
        
        try {

            /* Check Contact if already exist */
            const contact = await dbMongoContact.getById(id);
            if (_.isEmpty(contact)) {
                return res.boom.notAcceptable('Contact does not exist with given id');
            }

            if (contact.userId.toString() !== req.user._id.toString()) {
                return res.boom.notAcceptable('Contact does not belong to requested user');
            }


            const isDeleted = await dbMongoContact.remove(id);

            console.log('Contact deleted: ', isDeleted);

            return res.status(200).json({isDeleted: true});

        } catch (e) {
            next(e);
        }
    };


    return {
        add: add,
        update: update,
        remove: remove
    };

}
