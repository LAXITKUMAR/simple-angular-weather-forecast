// @author kumar.laxit@gmail.com
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['**/*-spec.js'],

    onPrepare: function () {
        require('protractor-http-mock').config = {
            rootDirectory: __dirname
        }
    }
};