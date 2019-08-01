import Express from 'express';

// Routes
import AddRoutes from './add';
import GetRoutes from './get';


/**
 * Test Routes Index
 * 
 * @param {Express} app - Express app
 */
export default function (app) {

    const addRoutes = AddRoutes(app);
    const getRoutes = GetRoutes(app);


    return {
        add: addRoutes.add,
        getAll: getRoutes.getAll,
        getAuth: getRoutes.getAuth,
    };

};
