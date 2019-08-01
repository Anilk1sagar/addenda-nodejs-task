import Express from 'express';
import _ from 'lodash';
import jwt from 'jsonwebtoken';

// Files
import EnvConfig from './../../configs/env.config';


// Interfaces
import { DbMongoUser, DbMongoUserRefreshToken } from '../../mongoose/interface';


/**
 * Routes Auth
 * 
 * @param {Express} app - Express app
 */
export default function (app) {

    const dbMongoUser = DbMongoUser(app);
    const dbMongoUserRefreshToken = DbMongoUserRefreshToken(app);


    /**
     * Register User
     * 
     * @param {Express.Request} req - HTTP request context.
     * @param {Express.Response} res - HTTP response context.
     * @param {Express.NextFunction} next - Next Function.
     */
    const register = async (req, res, next) => {
        
        req.checkBody('email', 'Enter a valid email').isAscii().isEmail();
        req.checkBody('password', 'Enter a valid password').isAscii();

        let errors = await req.validationErrors();
        if (errors) {
            errors = _.first(errors);
            const errValidation = {
                code: 400,
                message: errors.msg
            };
            return next(errValidation);
        }

        // console.log(req.user);

        let { email, password } = req.body;
        email = email.toLowerCase();
        
        try {

            /* Check Email if already exist */
            const user = await dbMongoUser.getByEmail(email);
            if (!_.isEmpty(user)) {
                return res.boom.notAcceptable('User already exist with given email');
            };


            const dbModel = {
                email: email,
                password: password
            };
    
            console.log('dbModel is: ', dbModel);

            const dbObject = await dbMongoUser.add(dbModel);

            console.log('User added: ', dbObject);   

            return res.status(200).json(dbObject);

        } catch (e) {
            next(e);
        }
    };


    /**
     * Authenticate User
     * 
     * @param {Express.Request} req - HTTP request context.
     * @param {Express.Response} res - HTTP response context.
     * @param {Express.NextFunction} next - Next Function.
     */
    const authenticate = async (req, res, next) => {

        req.checkBody('email', 'Enter a valid email').isAscii().isEmail();
        req.checkBody('password', 'Enter a valid password').isAscii();

        let errors = await req.validationErrors();
        if (errors) {
            errors = _.first(errors);
            const errValidation = {
                code: 400,
                message: errors.msg
            };

            return next(errValidation);
        }

        // console.log(req.user);

        let { email, password } = req.body;
        email = email.toLowerCase();

        try {

            /* Check User Email */
            const user = await dbMongoUser.getByEmail(email);
            if (_.isEmpty(user)) {
                return res.boom.notFound('User not found with given email');
            }


            const isPasswordMatch = await dbMongoUser.comparePassword(password, user.password);
            if (!isPasswordMatch) {
                return res.boom.notAcceptable('Wrong Password!');
            }


            /* Generating Refresh Token */
            const refreshToken = await _generateRefreshToken(user._id);
            // console.log('Refresh Token: ', refreshToken);

            // Adding Refresh Token
            const userRefreshTokenModel = {
                uid: user._id,
                token: refreshToken,
                isExpired: false
            };

            console.log('model is: ', userRefreshTokenModel);

            const userRefreshToken = await dbMongoUserRefreshToken.add(userRefreshTokenModel);
            console.log('User Refresh Token Added: ', userRefreshToken);


            return res.status(200).json({
                _id: user._id,
                email: user.email,
                refreshToken: refreshToken
            });

        } catch (e) {
            next(e);
        }
    };


    /**
     * Get Access Token
     * 
     * @param {Express.Request} req - HTTP request context.
     * @param {Express.Response} res - HTTP response context.
     * @param {Express.NextFunction} next - Next Function.
     */
    const getToken = async (req, res, next) => {

        req.checkBody('grantType', 'Enter a valid grantType').isAscii();
        req.checkBody('refreshToken', 'Enter a valid refreshToken').isAscii();

        let errors = await req.validationErrors();
        if (errors) {
            errors = _.first(errors);
            const errValidation = {
                code: 400,
                message: errors.msg
            };

            return next(errValidation);
        }

        // console.log(req.user);

        let { grantType, refreshToken } = req.body;

        try {

            const decoded = await jwt.verify(refreshToken, EnvConfig.webtokenSecretRefresh(), { ignoreExpiration: false });

            const uid = decoded.uid;

            /* Check RefreshToken Expires or Not */
            let checkRefreshToken = await dbMongoUserRefreshToken.getByUid(uid);
            console.log('Check Refresh Token: ', checkRefreshToken);

            if (checkRefreshToken.isExpired) {
                return res.boom.unauthorized('RefreshToken Expired');
            }

            /* Check User If Exist! */
            const user = await dbMongoUser.getById(uid);
            if (_.isEmpty(user)){
                return res.boom.unauthorized('Invalid refreshToken');
            }


            if (grantType !== 'refreshToken') {
                return res.boom.unauthorized('Invalid grantType'); 
            } 

            const accessToken = await _generateAccessToken(uid);
            console.log('Access Token is: ', accessToken);


            return res.status(200).json({
                accessToken: accessToken,
                expiresIn: EnvConfig.accessTokenExpire() * 60
            });

        } catch (e) {
            next(e);
        }
    };




    /************************************************************************************************************
     *                                          In File Custom Functions
    */

    /**
     * Genrating Refresh Token
     * 
     * @private
     * @param {string} pUserUID 
     */
    const _generateRefreshToken = async (pUserUID) => {

        return jwt.sign({ uid: pUserUID }, EnvConfig.webtokenSecretRefresh(),
            {
                issuer: "https://securetoken.google.com/addenda"
            }
        );

    };


    /**
     * Genrating Access Token
     * 
     * @private
     * @param {string} pUserUID 
     */
    const _generateAccessToken = async (pUserUID) => {
        return jwt.sign({ uid: pUserUID }, EnvConfig.webtokenSecretAccess(),
            {
                issuer: "https://securetoken.google.com/addenda",
                expiresIn: EnvConfig.accessTokenExpire() + 'm'
            }
        );
    };


    return {
        register: register,
        authenticate: authenticate,
        getToken: getToken,
    };

}
