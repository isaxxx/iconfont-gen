# iconfont-gen

Simple cli tool for generating of fonts from SVG icons.

[![NPM](https://nodei.co/npm/iconfont-gen.png)](https://nodei.co/npm/iconfont-gen/)
[![Build Status](https://travis-ci.org/isaxxx/iconfont-gen.svg?branch=master)](https://travis-ci.org/isaxxx/iconfont-gen)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

## Installation

### npm

```bash
$ npm install iconfont-gen --save
```

## Usage

```
Options:
  --src, -s             source directory path. [string] [default: "src/svg/*.svg"]
  --dest, -d            destination directory path. [string] [default: "dest/assets/fonts"]
  --name, -n            font file name. [string] [default: "iconfont"]
  --templateInput, -i   template file path. [string] [default: "src/svg/template.ejs"]
  --templateOutput, -o  template file output path. [string] [default: "src/scss/app/_iconfont.scss"]
  --version, -v         show this version. [boolean]
  --help, -h            show this help. [boolean]
```

## Example

```bash
$ iconfont-gen
```

##### src/svg/template.ejs

```css
@font-face {
    font-family: <%= config.name %>;
    src: url('../fonts/<%= config.name %>.woff2') format('woff2'), url('../fonts/<%= config.name %>.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
.iconfont {
    font-family: <%= config.name %>;
    font-style: normal;
    font-weight: normal;
    vertical-align: middle;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}<% glyphs.forEach(function (data) { %>
.iconfont--<%= data.name %>:before {
    content: '\<%= data.codepoint.toString(16).toUpperCase() %>';
}<% }); %>
@mixin iconfont($name: null){
    font-family: <%= config.name %>;
    font-style: normal;
    font-weight: normal;
    vertical-align: middle;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @if $name == null {
        content: '';
    }<% glyphs.forEach(function (data) { %>
    @else if $name == <%= data.name %> {
        content: '\<%= data.codepoint.toString(16).toUpperCase() %>';
    }<% }); %>
}
↓
/*
@font-face {
    font-family: iconfont;
    src: url('../fonts/iconfont.woff2') format('woff2'), url('../fonts/iconfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
.iconfont {
    font-family: iconfont;
    font-style: normal;
    font-weight: normal;
    vertical-align: middle;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.iconfont--icon1:before {
    content: '\EA01';
}
.iconfont--icon2:before {
    content: '\EA02';
}
.iconfont--icon3:before {
    content: '\EA03';
}
@mixin iconfont($name: null){
    font-family: iconfont;
    font-style: normal;
    font-weight: normal;
    vertical-align: middle;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    @if $name == null {
        content: '';
    }
    @else if $name == icon1 {
        content: '\EA01';
    }
    @else if $name == icon2 {
        content: '\EA02';
    }
    @else if $name == icon3 {
        content: '\EA03';
    }
}
*/
```

For more in depth documentation see: https://isaxxx.com/works/iconfont-gen/

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
