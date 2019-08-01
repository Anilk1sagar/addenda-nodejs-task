import Express from 'express';
import _ from 'lodash';
import mongoose from 'mongoose';

// Files
import logger from './../../utils/logger';
import dataProcessor from '../../utils/dataProcessor';

// Models
import Contact from './../../mongoose/models/contact';

// Model Types
import { ModelContact } from './../modelTypes';


/**
 * Interface Contact
 * 
 * @param {Express} app - Express app
 */
export default (app) => {

    /** @type {mongoose.Model} */
    const interfaceDbModel = Contact;


    /**
     * Get By Id
     * 
     * @param {string} pId 
     * @return {Promise<ModelContact>}
     */
    const getById = async (pId) => {

        console.log('Interface-Get By Id: ', pId);

        const promise = new Promise((resolve, reject) => {

            try {

                interfaceDbModel.findById(pId, null, (err, obj)=> {
                    
                    if (err) throw err;
                    
                    if(obj) {
                        resolve(obj);
                    } else {
                        resolve(null);
                    }
                });
    
            } catch (err) {
    
                logger.error('error in Contact.getById {}', err);
                throw err;
            }

        });
        

        const callback = await promise;
        console.log('callback GetById: ', callback);
        return callback;

    };


    /**
     * Get By Name
     * 
     * @param {string} pName 
     * @return {Promise<ModelUser>}
     */
    const getByName = async (pName) => {

        console.log('Interface: ', pName);
        
        const promise = new Promise((resolve, reject) => {

            try {

                interfaceDbModel.findOne({'name': pName}, (err, obj)=> {

                    console.log(obj);
                    
                    if (err) throw err;
                    
                    if(obj) {
                        resolve(obj);
                    } else {
                        resolve(null);
                    }
                });

            } catch (err) {

                logger.error("error in Contact.getByName {}", err);
                throw err;
            }

        });

        const callback = await promise;
        console.log('callback Contact By Name: ', callback);
        return callback;

    };


    /**
     * Get All
     * 
     * @param {string} pOffset 
     * @param {string} pLimit 
     * @param {string} pUserId 
     * @return {Promise<ModelContact[]>}
     */
    const getAll = async (pOffset, pLimit, pUserId) => {

        const promise = new Promise((resolve, reject) => {

            try {

                const { offset, limit } = dataProcessor.offsetLimit(pOffset, pLimit);

                const query = {
                    'userId': pUserId
                };

                const options = {
                    sort: { updated_date: -1 },
                    lean: true,
                    offset: offset,
                    limit: limit
                };

                interfaceDbModel.paginate(query, options).then((obj) => {
                    const data = [...obj.docs];
                    resolve(data);
                });
    
            } catch (err) {
    
                logger.error('error in Contact.getAll {}', err);
                throw err;
            }

        });
        

        const callback = await promise;
        console.log('callback GetAll: ', callback);
        return callback;

    };



    /**
     * Add
     * 
     * @param {ModelTest} pModel 
     * @return {Promise<ModelContact>}
     */
    const add = async (pModel) => {

        console.log('Interface: ', pModel);

        const promise = new Promise((resolve, reject) => {

            try {

                // Add in Database
                const Model = new Contact(pModel);

                Model.save((err, obj) =>{

                    if (err) throw err;

                    if(obj) {
                        resolve(obj);
                    } else {
                        resolve(null);
                    }
                });

            } catch (err) {

                logger.error('error in Contact.add {}', err);
                throw err;
            }

        });

        
        const callback = await promise;
        console.log('callback Add Contact: ', callback);
        return callback;

    };


    /**
     * Update Contact
     * 
     * @param {string} pId
     * @param {ModelContact} pModel
     * @return {Promise<boolean>}
     */
    const update = async (pId, pModel) => {

        const promise = new Promise((resolve, reject) => {

            const dbModel = {};

            if (pModel.name) {
                dbModel.name = pModel.name
            }
            if (pModel.phone) {
                dbModel.phone = pModel.phone
            }

            try {

                console.log('Interface User: ', dbModel);

                interfaceDbModel.findByIdAndUpdate({_id: pId}, dbModel, (err, obj) => {

                    if (err) throw err;

                    console.log('obj is: ', obj);
                    if(obj) {
                        resolve(true);
                    } else {
                        resolve(null);
                    }
                });


            } catch (err) {

                logger.error("error in Contact.update{}", err);
                throw err;
            }

        });

        
        const callback = await promise;
        console.log('callback Contact Update: ', callback);
        return callback;

    };


    /**
     * Remove Contact
     * 
     * @param {string} pId
     * @return {Promise<boolean>}
     */
    const remove = async (pId) => {

        const promise = new Promise((resolve, reject) => {

            try {

                console.log('Interface User: ', pId);

                interfaceDbModel.findByIdAndRemove({_id: pId}, (err, obj) => {

                    if (err) throw err;

                    console.log('obj is: ', obj);
                    if(obj) {
                        resolve(true);
                    } else {
                        resolve(null);
                    }
                });

            } catch (err) {

                logger.error("error in Contact.remove{}", err);
                throw err;
            }

        });

        
        const callback = await promise;
        console.log('callback Contact remove: ', callback);
        return callback;

    };


    return {
        getById: getById,
        getByName: getByName,
        getAll: getAll,
        add: add,
        update: update,
        remove: remove
    };

};
