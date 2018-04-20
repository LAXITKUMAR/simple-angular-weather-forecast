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
            then: function(){}
        });
        controller.search();
        expect(weatherDetails.getWeatherDetailsByCity).toHaveBeenCalledWith('testCity');
    });
});