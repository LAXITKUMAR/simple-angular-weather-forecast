(function () {
    'use strict';
    var app = angular.module('sawf.app');
    app.controller('homeController', ['$scope', 'weatherDetails', function ($scope, weatherDetails) {
        var self = this;
        self.cityName = ""; // The city Name for which we should search the weather
        self.cityList = JSON.parse(window.localStorage.getItem('weatherForcastList')) || window.localStorage.setItem('weatherForcastList', JSON.stringify({}));

        // Function to make service call if city data is not present in the local storage
        self.search = function () {
            var city = self.cityName;
            var weatherForcast = JSON.parse(window.localStorage.getItem('weatherForcastList')) || window.localStorage.setItem('weatherForcastList', JSON.stringify({}));
            if (city) {
                if (!(weatherForcast[city])) { // Check if data is already present in local storage for that ciyt
                    weatherDetails.getWeatherDetailsByCity(city).then(function (response) {
                        if (!response) {
                            return;
                        }
                        weatherForcast[city] = response;
                        // Store in localstorage as map of city and its data
                        window.localStorage.setItem('weatherForcastList', JSON.stringify(weatherForcast));
                        self.cityList = weatherForcast;
                    }, function (err) {
                        console.log("Error occured while fetching weather details", err); //TODO: Replace it with notificatiuon
                    });
                }
            }
        }
    }])

})();