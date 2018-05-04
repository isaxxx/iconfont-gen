const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const SVGIcons2SVGFontStream = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');
const defaultConfig = require('./command');
const render = require('./util/render');
const deleteLastSlash = require('./util/deleteLastSlash');

/**
 *
 * exec
 * @param {object} config   config object
 * @param {function}        callback
 *
 */

module.exports = (config, callback) => {
    config = Object.assign({}, defaultConfig, config);
    const fontStream = new SVGIcons2SVGFontStream({
        fontName: config.name,
        log: function(){}
    });
    const svgFiles   = glob.sync(config.src);
    const glyphs = [];

    let svgBuffer = Buffer.alloc(0),
        codePoint = parseInt('0xEA01', 16);

    fontStream.on('data', (data) => {
        svgBuffer = Buffer.concat([svgBuffer, data]);
    })
    .on('end', () => {
        try {
            svgBuffer = svgBuffer.toString();
            const ttf = svg2ttf(svgBuffer, {});
            const ttfBuffer = Buffer.from(ttf.buffer);
            const woff = ttf2woff(ttfBuffer, {});
            const woff2 = ttf2woff2(ttfBuffer, {});
            const dest = deleteLastSlash(config.dest);
            const options = {
                glyphs: glyphs,
                config: config
            };
            mkdirp(dest, (err) => {
                if (!err) {
                    fs.writeFile(dest + '/' + config.name + '.woff', Buffer.from(woff.buffer));
                    console.log(chalk.green('Output: ' + dest + '/' + config.name + '.woff'));
                    fs.writeFile(dest + '/' + config.name + '.woff2', woff2);
                    console.log(chalk.green('Output: ' + dest + '/' + config.name + '.woff2'));
                    render(config.templateInput, config.templateOutput, options, {});
                    if ( callback ) {
                        callback(options);
                    }
                } else {
                    console.error(chalk.red(err));
                }
            });
        } catch (err) {
            console.error(chalk.red(err));
        }
    })
    .on('error', (err) => {
        console.error(chalk.red(err));
    });

    svgFiles.forEach((file) => {
        const glyph   = fs.createReadStream(file);
        const name    = path.basename(file, path.extname(file));
        const unicode = String.fromCharCode(codePoint);
        glyph.metadata = {
            name: name,
            unicode: [unicode]
        };
        fontStream.write(glyph);
        glyphs.push({
            name: name,
            codepoint: codePoint
        });
        codePoint++;
    });

    fontStream.end();
};
