// @author kumar.laxit@gmail.com
// Test cases for  Weather Details Service
describe('Test Weather Details Service:', function () {
    beforeEach(module('sawf.app'));

    var APP_ID;
    var weatherDetails;
    var $httpBackend;

    beforeEach(inject(function (_weatherDetails_, _APP_ID_, _$httpBackend_) {
        weatherDetails = _weatherDetails_;
        $httpBackend = _$httpBackend_;

        jasmine.getJSONFixtures().fixturesPath = 'base/test/server';

        $httpBackend.whenGET("http://api.openweathermap.org/data/2.5/weather?q=england&appid=dee099c57ee9f9af0aa04db62e38c3e0").respond(getJSONFixture('weatherDetailsEnglandMock.json'));
        $httpBackend.whenGET("http://api.openweathermap.org/data/2.5/weather?q=&appid=dee099c57ee9f9af0aa04db62e38c3e0").respond(400, {}); // Empty city name
        $httpBackend.whenGET(/.*.html/).respond(200, '');

    }));

    it('Should return the expected object when getWeatherDetailsByCity function is called', function () {
        var expectedReturn = {
            "temp": 292.9,
            "pressure": 1017,
            "humidity": 56,
            "temp_min": 291.15,
            "temp_max": 294.15
        };
        weatherDetails.getWeatherDetailsByCity('england').then(function (response) {
            expect(response).toEqual(expectedReturn);
        });
        $httpBackend.flush();
    });
    /**************************
     * Negative Test Case
     **************************/
    it('Should return the null when getWeatherDetailsByCity function is called and http service call fails', function () {
        var expectedReturn = null;
        weatherDetails.getWeatherDetailsByCity('').then(function (response) { // NOTE: Empty CityName
            expect(response).toEqual(expectedReturn);
        });
        $httpBackend.flush();
    });

});