/**
 *
 * delete last slash
 * @param {string} str	string
 * @return {string} 	string
 *
 */

module.exports = (str) => {
    if ( str.slice(-1) === '/' ) {
        str = str.slice(0, -1);
    }
    return str;
};
