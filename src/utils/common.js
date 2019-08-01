import _ from 'lodash';

export default {
    
    arr_diff : (arr1, objArr) => {

        var a = [], diff = [];

        for (var i = 0; i < arr1.length; i++) {

            if(objArr.includes(arr1[i])) {
                a[arr1[i]] = true;
            }
            // a[arr1[i]] = true;
        }

        for (var i = 0; i < objArr.length; i++) {
            if (a[objArr[i]]) {
                delete a[objArr[i]];
            } else {
                a[objArr[i]] = true;
            }
        }

        for (var k in a) {
            diff.push.apply(diff, k.split(",").map(Number));
            // diff.push(k);
        }

        return diff;
    },

    /**
     * Validate http Url
     * 
     * @param {string} url
     * @return {boolean}
     */
    validateURL: (url) => {
        const RegExpForUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

        return (RegExpForUrl.test(url)) ? true : false;
    },


    /**
     * Validate Email
     * 
     * @param {string} email
     * @return {boolean}
     */
    validateEmail: (email) => {
        const RegExpForEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

        return (RegExpForEmail.test(email)) ? true : false;
    },


    /**
     * Convert String to boolean
     * 
     * @param {string | boolean} pValue
     * @return {boolean}
     */
    convertStringToBool: (pValue) => {

        return ['true', 'TRUE', 'false', 'FALSE', true, false].includes(pValue) && JSON.parse(pValue);
    }
};