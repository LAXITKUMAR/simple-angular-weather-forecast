var mock = require('protractor-http-mock'),
    get = require('../get');

describe("Home Page", function () {

    afterEach(function () {
        mock.teardown();
    });

    it('on click of Submit button without entering city name should not populate any row in the table', function () {
        get();
        element(by.css('.btn.btn-primary')).click();
        var rows = element.all(by.css('tbody tr'));
        expect(rows.count()).toBe(0);
    });

    it('on click of Submit button with entering city name as "england" should populate exactly one row in the table', function () {
        get();
        element(by.model('homeCtrl.cityName')).sendKeys('england');
        element(by.css('.btn.btn-primary')).click();
        var rows = element.all(by.tagName('tbody tr'));
        expect(rows.count()).toBe(1);
    });

    it('on click of Submit button with same city name as "england" should not populate another row in the table', function () {
        get();
        element(by.model('homeCtrl.cityName')).sendKeys('england');
        element(by.css('.btn.btn-primary')).click();
        var rows = element.all(by.tagName('tbody tr'));
        expect(rows.count()).toBe(1);

        // Click one more time with same city name
        element(by.css('.btn.btn-primary')).click();
        rows = element.all(by.tagName('tbody tr'));
        expect(rows.count()).toBe(1);
    });
})