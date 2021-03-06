(function(){
    'use strict';
    var app = angular.module("sawf.app");

    app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){
        $urlRouterProvider.otherwise('/');
        // State 
        $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './home/home.html',
            controller: 'homeController',
            controllerAs: 'homeCtrl'
        });
    }]);
})();