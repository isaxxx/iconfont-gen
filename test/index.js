const iconfontGen = require('../index');
const test = require('ava');

// test

test('callback test', (t) => {
    const fontName = 'iconfont';
    return new Promise((resolve, reject) => {
		return iconfontGen({
	        name: fontName
	    }, (options) => {
	        console.log('fontName: '+fontName);
	        console.log('options.config.name: '+options.config.name);
	        if (options.config.name === fontName) {
	        	return resolve(t.pass());
	        } else {
				return reject(t.fail());
	        }
	    });
	});
});
