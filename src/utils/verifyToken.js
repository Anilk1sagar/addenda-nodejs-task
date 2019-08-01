import _ from 'lodash';
import jwt from 'jsonwebtoken';




/**
 * Verify JWT token
 * 
 * @param {string} jwtToken
 * @param {string} secret
 */
async function verifyJwtToken(jwtToken, secret) {

    console.log('verifyJwtToken: ', jwtToken);

    const token = (jwtToken.includes('bearer') | jwtToken.includes('Bearer'))? jwtToken.split(' ')[1] : jwtToken;
   
    return new Promise((resolve, reject) => {

        jwt.verify(token, secret, { ignoreExpiration: false }, (err, decoded)=> {
            if(err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
         
};


export default {
    verifyJwtToken: verifyJwtToken,
};