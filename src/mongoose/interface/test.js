import Express from 'express';
import _ from 'lodash';
import mongoose from 'mongoose';

// Files
import logger from './../../utils/logger';
import dataProcessor from '../../utils/dataProcessor';

// Models
import Test from './../../mongoose/models/test';

// Model Types
import { ModelTest } from './../modelTypes';


/**
 * Interface Test
 * 
 * @param {Express} app - Express app
 */
export default (app) => {

    /** @type {mongoose.Model} */
    const interfaceDbModel = Test;


    /**
     * Get By Id
     * 
     * @param {string} pId 
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
    
                logger.error('error in TestCtrl.getById {}', err);
                throw err;
            }

        });
        

        const callback = await promise;
        console.log('callback Get By Id: ', callback);
        return callback;

    };


    /**
     * Get All
     * 
     * @param {string} pOffset 
     * @param {string} pLimit 
     */
    const getAll = async (pOffset, pLimit) => {

        const promise = new Promise((resolve, reject) => {

            try {

                const { offset, limit } = dataProcessor.offsetLimit(pOffset, pLimit);

                // const query = {
                //     'name': pName
                // };

                const options = {
                    sort: { updated_date: -1 },
                    lean: true,
                    offset: offset,
                    limit: limit
                };

                interfaceDbModel.paginate(null, options).then((obj) => {
                    const data = [...obj.docs]
                    resolve(data);
                });
    
            } catch (err) {
    
                logger.error('error in TestCtrl.getAll {}', err);
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
     * @return {Promise<ModelTest>}
     */
    const add = async (pModel) => {

        console.log('Interface: ', pModel);

        const promise = new Promise((resolve, reject) => {

            try {

                // Add Test in Database
                const ModelTest = new Test(pModel);

                ModelTest.save((err, obj) =>{

                    if (err) throw err;

                    if(obj) {
                        resolve(obj);
                    } else {
                        resolve(null);
                    }
                });

            } catch (err) {

                logger.error('error in TestCtrl.add {}', err);
                throw err;
            }

        });

        
        const callback = await promise;
        console.log('callback Add test: ', callback);
        return callback;

    };



    return {
        getById: getById,
        getAll: getAll,
        add: add,
    };

};
