/**
 *
 * command line
 * @return {object} config object
 *
 */

module.exports = require('yargs').usage('iconfont-gen [options]')
.option('src', {
    alias: 's',
    default: 'src/svg/*.svg',
    type: 'string',
    describe: 'source svg file path pattern.'
})
.option('dest', {
    alias: 'd',
    default: 'dest/assets/fonts',
    type: 'string',
    describe: 'destination directory path.'
})
.option('name', {
    alias: 'n',
    default: 'iconfont',
    type: 'string',
    describe: 'font file name.'
})
.option('templateInput', {
    alias: 'i',
    default: 'src/svg/template.ejs',
    type: 'string',
    describe: 'template file path.'
})
.option('templateOutput', {
    alias: 'o',
    default: 'src/scss/app/_iconfont.scss',
    type: 'string',
    describe: 'template file output path.'
})
.version()
.help('help')
.alias('version', 'v')
.alias('help', 'h')
.argv;
