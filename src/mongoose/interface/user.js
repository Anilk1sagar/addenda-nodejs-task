import Express from 'express';
import bcrypt from 'bcryptjs';
import _ from 'lodash';

// Files
import logger from './../../utils/logger';
import dataProcessor from '../../utils/dataProcessor';


// Models
import User from './../../mongoose/models/user';

// Model Types
import { ModelUser } from './../modelTypes';



/**
 * Interface user
 * 
 * @param {Express} app - Express app
 */
export default (app) => {

    /** @type {mongoose.Model} */
    const interfaceDbModel = User;


    /**
     * Get By Id
     * 
     * @param {string} pId 
     * @return {Promise<ModelUser>}
     */
    const getById = async (pId) => {

        const promise = new Promise((resolve, reject) => {

            console.log('Interface-Get User By Id: ', pId);

            try {

                interfaceDbModel.findById(pId, { password: 0 }, (err, user)=> {
                    
                    if (err) throw err;
                    
                    if(user) {
                        resolve(user);
                    } else {
                        resolve(null);
                    }
                });
    
            } catch (err) {
    
                logger.error('error in UserCtrl.getById {}', err);
                throw err;
            }

        });
        

        const callback = await promise;
        console.log('callback Get User By Id: ', callback);
        return callback;

    };


    /**
     * Get User By Email
     * 
     * @param {string} pEmail 
     * @return {Promise<ModelUser>}
     */
    const getByEmail = async (pEmail) => {

        console.log('Interface: ', pEmail);
        
        const promise = new Promise((resolve, reject) => {

            try {

                interfaceDbModel.findOne({'email': pEmail}, (err, user)=> {

                    console.log(user);
                    
                    if (err) throw err;
                    
                    if(user) {
                        resolve(user);
                        //resolve(_.pick(user, ['_id', 'name', 'email']));
                    } else {
                        resolve(null);
                    }
                });

            } catch (err) {

                logger.error("error in UserCtrl.getByEmail {}", err);
                throw err;
            }

        });

        const callback = await promise;
        console.log("callback Search User By Email: ", callback);
        return callback;

    };



    /**
     * Add User
     * 
     * @param {ModelUser} pModel
     * @return {Promise<ModelUser>}
     */
    const add = async (pModel) => {

        console.log('Interface: ', pModel);

        const promise = new Promise((resolve, reject) => {

            try {

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(pModel.password, salt, (err, hash) => {

                        if(err) throw err;

                        pModel.password = hash;

                        // Add user in Database
                        const ModelUser = new User(pModel);

                        ModelUser.save((err, user) =>{

                            if (err) throw err;

                            if(user) {
                                resolve(_.pick(user, ['_id', 'email']));
                            } else {
                                resolve(null);
                            }
                        });

                    });
                });

            } catch (err) {

                logger.error('error in user.add {}', err);
                throw err;
            }

        });

        
        const callback = await promise;
        console.log('callback Add User: ', callback);
        return callback;

    };


    
    /**
     * Compare Password
     * 
     * @param {string} candidatePassword
     * @param {string} hash
     */
    const comparePassword = async (candidatePassword, hash) => {

        const promise = new Promise((resolve, reject) => {

            try {

                bcrypt.compare(candidatePassword, hash, (err, isMatch) => {

                    if (err) throw err;

                    resolve(isMatch);
                });

            } catch (err) {

                logger.error('error in user.comparePassword {}', err);
                throw err;
            }

        });

        
        const callback = await promise;
        console.log('callback User compare passowrd: ', callback);
        return callback;

    };




    return {
        getById: getById,
        getByEmail: getByEmail,
        add: add,
        comparePassword: comparePassword,
    };

};
