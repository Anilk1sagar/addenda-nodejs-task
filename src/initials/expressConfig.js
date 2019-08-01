import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Boom from 'express-boom';
import cors from 'cors';
import path from 'path';
import util from 'util';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import jwt from 'express-jwt';
import Validator from 'express-validator';
import mongoose from 'mongoose';
// Files
import RouterConfig from './routerConfig';
import EnvConfig from '../configs/env.config';


export default {

    /**
     * Express app configuration
     * 
     * @param {express.Application} app - Express app
     * @param {string|null} publicKey - Jwt token secret access key
     */
    configure: async (app, publicKey) => {

        console.log(__dirname);

        // Compress all routes responses
        app.use(compression({filter: shouldCompress}));
        function shouldCompress (req, res) {
            if (req.headers['x-no-compression']) return false;
            return compression.filter(req, res);
        }

        // Set Static Path
        app.use('/', express.static(path.join(__dirname, './../../public')));

        // Moragan
        app.use(morgan('dev'));

        // Body Parser
        app.use(bodyParser.urlencoded({
            extended: true,
            limit: 1024 * 1024 * 100,
            parameterLimit: 100000
        }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // Express Validator & Boom
        app.use(Validator());
        app.use(Boom());

        // Global Util
        global.util = util;

        // Cookie Parser & Cors
        app.use(cookieParser());
        app.use(cors());

        // Helmit
        app.use(helmet());
        app.use(helmet.noCache());
        app.use(helmet.frameguard('SAMEORIGIN'));
        app.use(helmet.xssFilter({ setOnOldIE: true }));
        app.use(helmet.hsts({
            maxAge: 7776000000,
            includeSubDomains: true
        }));
        app.use(helmet.hidePoweredBy());
        app.use(helmet.noSniff());

        /* Express Rate limit */
        app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
        app.use(rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100 // limit each IP to 100 requests per windowMs
        }));


        // Jwt Auth for router
        app.use(jwt({ secret: publicKey })
            .unless({
                path: [
                    new RegExp('/$', "i"),
                    new RegExp('/api/error', "i"),
                    new RegExp('/api/tests/*', "i"),
                    new RegExp('/api/auth*', "i"),
                    new RegExp('/api/search*', "i"),
                ]
            })
        );
        
        
        // Set Content Types
        _setContentTypes(app);

        //========================= DATABASE CONNECTION START ========================//
        // const mongoDbUrl = Config.getMongooseDBUrl();
        const mongoDbUrl = 'mongodb+srv://addenda:addenda123@addenda-6kqu6.mongodb.net/addendalocaldb?retryWrites=true&w=majority';

        console.log('Database URL: ', mongoDbUrl);

        // Connect To Database
        mongoose.connect(mongoDbUrl, { useNewUrlParser: true });

        // On Connection
        mongoose.connection.on('connected', () => {
            console.log('Connected to database ' + mongoDbUrl);
        });

        // Database Connection Error
        mongoose.connection.on('error', (err) => {
            console.log('Database error: ' + err);
        });

        //========================= DATABASE CONNECTION ENDS ========================//

        /* Initialize Router */
        app = RouterConfig.initRoutes(app);


        // Remove console log in production
        if (EnvConfig.isProduction()) {
            console.log = function() {}
        }

        return app;

    },

};


/**
 * Set Content Types for all routes
 * 
 * @private
 * @param {express.Application} app
 */
const _setContentTypes = (app) => {
     
    app.use((req, res, next) => {

        const contentTypes = [
            'application/x-www-form-urlencoded',
            'application/json'
        ];
        
        if (req.headers['content-type'] && !contentTypes.includes(req.headers['content-type'])) {
            return res.boom.notAcceptable('Content Type not acceptable');
        }

        next();
    });
};
