(function(){
    'use strict';
     var app = angular.module('sawf.app');
     app.component('weatherTable', {
         bindings: {
            data: '<'
         },
         templateUrl: './components/weatherTable/weatherTable.html'
     })
})()