import Express from 'express';

// Files
import Routes from './../routes';


export default {

    /**
     * Initialize all api routes
     * 
     * @param {Express.Application} app - Express app
     */
    initRoutes: (app) => {
        
        const routes = Routes(app);
        
        console.log('_initRoutes');
        
        app.use('/api', routes);

        return app;
    }

};
