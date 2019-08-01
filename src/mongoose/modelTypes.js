/* *
* Queries a Baz for items.
* @param {any} db 
* @prop {Sequelize.Sequelize} sequelize 
* @param {Sequelize} Sequelize ,
* or itemId, or null to search everything.
*/


/**
 * @typedef{{
    _id: string,
    name: string
}}
 */
const ModelTest = {};



/* ================= Users Models ================= */
/**
 * @typedef{{
    _id: string,
    email: string,
    password: string
}}
 */
const ModelUser = {};


/**
 * @typedef{{
    uid: string,
    token: string,
    isExpired: boolean
}}
 */
const ModelUserRefreshToken = {};


/* ================= Contact Models ================= */
/**
 * @typedef{{
    _id: string,
    userId: string,
    name: string,
    phone: number
}}
 */
const ModelContact = {};




export { 
    ModelTest,
    // User
    ModelUser,
    ModelUserRefreshToken,
    // Contact
    ModelContact

};
