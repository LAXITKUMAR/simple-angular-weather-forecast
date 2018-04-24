// Test cases for home controller
describe('Test Home Controller:', function () {
    beforeEach(module('sawf.app'));

    var $controller;
    var weatherDetails;
    var $scope;

    beforeEach(inject(function (_$controller_, _weatherDetails_) {
        $controller = _$controller_;
        weatherDetails = _weatherDetails_;
    }));

    it('Should call weatherDetails service if city name is not empty', function () {
        var $scope = {};
        var controller = $controller('homeController', { $scope: $scope });
        controller.cityName = 'testCity';
        spyOn(weatherDetails, 'getWeatherDetailsByCity').and.returnValue({
            then: function () { }
        });
        controller.search();
        expect(weatherDetails.getWeatherDetailsByCity).toHaveBeenCalledWith('testCity');
    });
    it('Should not store anything in the localstorage if response from the api is empty, null or undefined', function () {
        var $scope = {};
        var responseFromService;
        var controller = $controller('homeController', { $scope: $scope });
        controller.cityName = 'testCity';
        spyOn(localStorage, 'setItem')
        spyOn(weatherDetails, 'getWeatherDetailsByCity').and.returnValue({
            then: function (cb) {
                cb(responseFromService);
            }
        });

        responseFromService = null; // NOTE: Mocking the response to null
        controller.search();
        expect(localStorage.setItem).not.toHaveBeenCalled();

        responseFromService = undefined; // NOTE: Mocking the response to undefined
        controller.search();
        expect(localStorage.setItem).not.toHaveBeenCalled();

        responseFromService = ""; // NOTE: Mocking the response to empty string
        controller.search();
        expect(localStorage.setItem).not.toHaveBeenCalled();
    });

    it('Should store the response from api to localstorage if response from the api is not empty, null or undefined', function () {
        var $scope = {};
        var responseFromService;
        var controller = $controller('homeController', { $scope: $scope });
        controller.cityName = 'testCity';
        var store = {}; // Mock storage

        spyOn(localStorage, 'getItem').and.callFake(function (key) {
            return store[key];
        });
        spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
            return store[key] = value;
        });
        spyOn(weatherDetails, 'getWeatherDetailsByCity').and.returnValue({
            then: function (cb) {
                cb(responseFromService);
            }
        });

        localStorage.setItem('weatherForcastList', JSON.stringify({}));
        controller.search();
        var storedItemsLength = Object.keys(JSON.parse(localStorage.getItem('weatherForcastList'))).length;
        expect(storedItemsLength).toEqual(0);

        // Now set the response from server and then check its value 
        responseFromService = {
            'city': 'Bangalore',
            'temp': '297.2',
            'pressure': '1013',
            'humidity': '73',
            'temp_min': '296.3',
            'temp_max': '299.5',
        };
        controller.search();
        storedItemsLength = Object.keys(JSON.parse(localStorage.getItem('weatherForcastList'))).length;
        expect(storedItemsLength).toEqual(1);
    });
});