import Express from 'express';
import Router from 'express';

// Middleware
import errorHandler from '../middleware/errorHandler';
import UserFind from '../middleware/userFind';


// Routes Path
import Test from './test';
import Auth from './auth';
import Contact from './contact';


/**
 * All Routes endpoints
 * 
 * @param {Express.Application} app Express app
 */
export default function (app) {
    
    const routes = Router();
    const userFind = UserFind(app);

    
    /* ==== Test Routes ==== */
    const test = Test(app);
    routes.post('/tests', test.add);
    routes.get('/tests', test.getAll);
    routes.get('/test/auth/get', userFind.findUser, test.getAuth);



    /* ==== Auth Routes ==== */
    const auth = Auth(app);
    routes.post('/auth/register', auth.register);
    routes.post('/auth/login', auth.authenticate);
    routes.post('/auth/token', auth.getToken);



    /* ==== Auth Routes ==== */
    const contact = Contact(app);
    routes.post('/contacts', userFind.findUser, contact.add);
    routes.put('/contacts/:id', userFind.findUser, contact.update);
    routes.delete('/contacts/:id', userFind.findUser, contact.remove);
    routes.get('/contacts', userFind.findUser, contact.getAll);




    // Error Handler
    routes.use(errorHandler);

    return routes;
}