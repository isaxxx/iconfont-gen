/**
 *
 * CLI
 * @return {object}
 *
 */

const path = require('path');

module.exports = require('yargs').usage('iconfont-gen [options]').option('src', {
  default: './src/svg/*.svg',
  type: 'string',
  describe: 'src files path pattern.'
}).option('dest', {
  default: './dest/assets/fonts/',
  type: 'string',
  describe: 'dest directory path.'
}).option('name', {
  default: 'iconfont',
  type: 'string',
  describe: 'font name.'
}).option('templateInput', {
  default: path.resolve(__dirname, '../template/index.ejs'),
  type: 'string',
  describe: 'template file path.'
}).option('templateOutput', {
  default: './src/scss/_iconfont.scss',
  type: 'string',
  describe: 'template file output path.'
}).version().help('help').alias('version', 'v').alias('help', 'h').argv;
