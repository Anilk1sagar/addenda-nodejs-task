import Express from 'express';

// Routes
import AuthRoutes from './auth';


/**
 * Auth Routes Index
 * 
 * @param {Express} app - Express app
 */
export default function (app) {

    const authRoutes = AuthRoutes(app);


    return {
        register: authRoutes.register,
        authenticate: authRoutes.authenticate,
        getToken: authRoutes.getToken
    };

};
