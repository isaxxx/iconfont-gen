const iconfontGen = require('../index');
const test = require('ava');
const fs = require('fs-extra');

test('exec - case 001', (t) => {
  return iconfontGen({
    src: './test/fixtures/case-001/svg/*.svg',
    dest: './dest/assets/fonts/',
    name: 'iconfont',
    templateInput: './test/fixtures/case-001/template/index.ejs',
    templateOutput: './src/scss/_iconfont.scss'
  }).then(() => {
    t.is(fs.readFileSync('./test/expect/case-001/scss/_iconfont.scss', 'UTF-8'), fs.readFileSync('./src/scss/_iconfont.scss', 'UTF-8'));
  });
});
