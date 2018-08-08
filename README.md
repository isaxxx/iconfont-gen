# iconfont-gen

Generate Iconfont from SVG files.

[![NPM](https://nodei.co/npm/iconfont-gen.png)](https://nodei.co/npm/iconfont-gen/)
[![Build Status](https://travis-ci.org/isaxxx/iconfont-gen.svg?branch=master)](https://travis-ci.org/isaxxx/iconfont-gen)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Installation

### NPM

```bash
$ npm install iconfont-gen --save
```

## Usage

### CLI

```
Options:
  --src             src files path pattern. [string] [default: './src/svg/*.svg']
  --dest            dest directory path. [string] [default: './dest/assets/fonts/']
  --name            font name. [string] [default: 'iconfont']
  --templateInput   template file path. [string] [default: __dirname + '/template/index.ejs']
  --templateOutput  template file output path. [string] [default: './src/scss/_iconfont.scss']
  --version, -v     show this version. [boolean]
  --help, -h        show this help. [boolean]
```

```bash
$ iconfont-gen --src ./src/svg/*.svg --dest ./dest/assets/fonts/ --name iconfont --templateInput ./template/index.ejs --templateOutput ./src/scss/_iconfont.scss
```

### JavaScript

```js
iconfontGen({
  src: './src/svg/*.svg',
  dest: './dest/assets/fonts/',
  name: 'iconfont',
  templateInput: './template/index.ejs',
  templateOutput: './src/scss/_iconfont.scss'
}).then(() => {
  console.log('Complete!!');
});
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
