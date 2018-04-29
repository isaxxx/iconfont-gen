const ejs = require('ejs');
const chalk = require('chalk');
const fs = require('fs-extra');

/**
 *
 * render
 * @param {string} srcFilePath      src file path
 * @param {string} destFilePath     dest path
 * @param {object} options          ejs options data object
 * @param {object} config           ejs cli setting
 * @param {function}                callback
 *
 */

module.exports = (srcFilePath, destFilePath, options, config, callback) => {
    ejs.renderFile(srcFilePath, options, config, (err, str) => {
        if (err) {
            console.error(chalk.red(err));
        }
        if (!callback) {
            fs.outputFile(destFilePath, str, config, (err) => {
                if (err) {
                    console.error(chalk.red(err));
                } else {
                    console.log(chalk.green('Output: ' + destFilePath));
                }
            });
        } else {
            callback(str);
        }
    });
};
