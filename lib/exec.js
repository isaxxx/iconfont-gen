/**
 *
 * Exec
 * @param {object} param
 * @return {promise}
 *
 */

const chalk = require('chalk');
const ejs = require('ejs');
const fs = require('fs-extra');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const SVGIcons2SVGFontStream = require('svgicons2svgfont');
const svg2ttf = require('svg2ttf');
const ttf2woff = require('ttf2woff');
const ttf2woff2 = require('ttf2woff2');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');
const defaultParam = require('./command');

module.exports = (param) => {
  return new Promise((resolve) => {
    updateNotifier({pkg}).notify();
    param = Object.assign(defaultParam, param);
    resolve();
  }).then(() => {
    return new Promise((resolve, reject) => {
      const fontStream = new SVGIcons2SVGFontStream({
        fontName: param.name,
        log: function() {}
      });
      const svgFilesPath   = glob.sync(param.src);
      const glyphs = [];
      let svgBuffer = Buffer.alloc(0);
      let codePoint = parseInt('0xEA01', 16);
      fontStream.on('data', (data) => {
        svgBuffer = Buffer.concat([
          svgBuffer,
          data
        ]);
      }).on('end', () => {
        svgBuffer = svgBuffer.toString();
        try {
          const ttf = svg2ttf(svgBuffer, {});
          const ttfBuffer = Buffer.from(ttf.buffer);
          const woff = ttf2woff(ttfBuffer, {});
          const woff2 = ttf2woff2(ttfBuffer, {});
          const data = {
            glyphs: glyphs,
            name: param.name
          };
          mkdirp(param.dest, (err) => {
            if (err) {
              reject(err);
            } else {
              fs.writeFile(param.dest + param.name + '.woff', Buffer.from(woff.buffer));
              console.log(chalk.green('Output: ' + param.dest + param.name + '.woff'));
              fs.writeFile(param.dest + param.name + '.woff2', woff2);
              console.log(chalk.green('Output: ' + param.dest + param.name + '.woff2'));
              ejs.renderFile(param.templateInput, data, (err, str) => {
                if (err) {
                  reject(err);
                } else {
                  fs.outputFile(param.templateOutput, str, (err) => {
                    if (err) {
                      reject(err);
                    } else {
                      console.log(chalk.green('Output: ' + param.templateOutput));
                      resolve();
                    }
                  });
                }
              });
            }
          });
        } catch (err) {
          reject(err);
        }
      }).on('error', (err) => {
        reject(err);
      });
      svgFilesPath.forEach((svgFilePath) => {
        const glyph   = fs.createReadStream(svgFilePath);
        const name    = path.basename(svgFilePath, path.extname(svgFilePath));
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
    });
  }).catch((err) => {
    console.error(chalk.red(err));
  });
};
