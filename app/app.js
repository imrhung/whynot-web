'use strict';

// Declare app level variables.
var serviceUrl = 'http://localhost/improving-network/api/';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.twentyOther',
    'myApp.view2',
    'myApp.version',
    'UserApp'
]).
        config(['$routeProvider', function ($routeProvider) {
                $routeProvider.otherwise({redirectTo: '/twentyOther'});
            }]);
