import Express from 'express';

// Routes
import ContactRoutes from './contact';
import ContactGetRoutes from './get';


/**
 * Contact Routes Index
 * 
 * @param {Express} app - Express app
 */
export default function (app) {

    const contactRoutes = ContactRoutes(app);
    const contactGetRoutes = ContactGetRoutes(app);


    return {
        add: contactRoutes.add,
        update: contactRoutes.update,
        remove: contactRoutes.remove,
        getAll: contactGetRoutes.getAll,
    };

};
