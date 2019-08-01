import Express from 'express';
import _ from 'lodash';
import mongoose from 'mongoose';

// Files
import logger from './../../utils/logger';
import dataProcessor from '../../utils/dataProcessor';

// Models
import UserRefreshToken from './../../mongoose/models/userRefreshToken';

// Model Types
import { ModelUserRefreshToken } from './../modelTypes';


/**
 * Interface Test
 * 
 * @param {Express} app - Express app
 */
export default (app) => {

    /** @type {mongoose.Model} */
    const interfaceDbModel = UserRefreshToken;


    /**
     * Get By UId
     * 
     * @param {string} pUid 
     * @return {Promise<ModelUserRefreshToken>}
     */
    const getByUid = async (pUid) => {

        console.log('Interface-Get By UId: ', pUid);

        const promise = new Promise((resolve, reject) => {

            try {

                interfaceDbModel.findOne({'uid': pUid}, null, (err, obj)=> {
                    
                    if (err) throw err;
                    
                    if(obj) {
                        resolve(obj);
                    } else {
                        resolve(null);
                    }
                });
    
            } catch (err) {
    
                logger.error('error in UserRefreshToken.getByUId {}', err);
                throw err;
            }

        });
        

        const callback = await promise;
        console.log('callback Get By UId: ', callback);
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
    
                logger.error('error in UserRefreshToken.getAll {}', err);
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
     * @param {ModelUserRefreshToken} pModel 
     * @return {Promise<ModelUserRefreshToken>}
     */
    const add = async (pModel) => {

        console.log('Interface: ', pModel);

        const promise = new Promise((resolve, reject) => {

            try {

                // Add in Database
                const ModelUserRefreshToken = new UserRefreshToken(pModel);

                ModelUserRefreshToken.save((err, obj) =>{

                    if (err) throw err;

                    if(obj) {
                        resolve(obj);
                    } else {
                        resolve(null);
                    }
                });

            } catch (err) {

                logger.error('error in UserRefreshToken.add {}', err);
                throw err;
            }

        });

        
        const callback = await promise;
        console.log('callback Add UserRefreshToken: ', callback);
        return callback;

    };



    return {
        getByUid: getByUid,
        getAll: getAll,
        add: add,
    };

};
