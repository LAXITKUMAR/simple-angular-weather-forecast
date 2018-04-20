(function () {
    'use strict';
    var BASE_URL = 'http://openweathermap.org/weather'  // Base URL for API Calls 
    
    var app = angular.module("sawf.app");

    app.value('APP_ID', 'dee099c57ee9f9af0aa04db62e38c3e0');

    app.service('weatherDetails', ['$http', 'APP_ID', function ($http, APP_ID) {
        this.getWeatherDetailsByCity = function (city) {
            var URL = BASE_URL + '?q='+ city + '&appid=' + APP_ID;
            // TODO: CORS error is not resolved
            return $http({
                method: 'GET',
                url: URL,
                dataType: 'jsonp',
             }).then(function (response) {
                console.log("reponse from details call:", response) // TODO: Remove this
                return response.data.main;
            }, function (err) {
                console.log("Error while fetching eat details", err); //TODO: Show Notification if error occurs
                return [];
            })
        }
    }]);
})();