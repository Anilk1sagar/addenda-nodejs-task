import _ from 'lodash';


export default {
    
    /**
     * @param {string} pOffset
     * @param {string} pLimit
     */
    offsetLimit: (pOffset, pLimit) => {

        let limit = 10;
        let offset = 0;


        if (_.isEmpty(pOffset) || isNaN(pOffset)) {
            offset = 0;
        } else
            offset = parseInt(pOffset);

        if (_.isEmpty(pLimit) || isNaN(pLimit)) {
            // lim = 1;
        }
        else
            limit = parseInt(pLimit);

        return {
            offset: offset,
            limit: limit
        };
    },


    /**
     * @param {string} pQueryStrings
     */
    queryArrayToArray: (pQueryStrings)=>{
        let arr;
        if (pQueryStrings) {
            arr = pQueryStrings.split(",");
            arr = _.uniq(arr);
        } else {
            arr = [];
        }

        return arr;
    }
};