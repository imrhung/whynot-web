'use strict';

var twentyApp = angular.module('myApp.twentyOther', ['ngRoute', 'infinite-scroll']);

twentyApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                .when('/twentyOther', {
                    templateUrl: 'twentyOther/play.html',
                    controller: 'PlayCtrl'
                })
                .when('/twentyOther/discover', {
                    templateUrl: 'twentyOther/discover.html',
                    controller: 'DiscoverCtrl'
                });
    }]);

twentyApp.controller('PlayCtrl', ['$scope', '$http', function ($scope, $http) {

        // Load the random object:

        $scope.loadObject = function () {
            $http.get(serviceUrl + 'twenty_object?random=1')
                    .success(function (data, status) {
                        console.log(data);
                        $scope.object = {};
                        $scope.object.id = data.id;
                        $scope.object.name = data.name;
                        $scope.object.image_url = data.image_url;
                    })
                    .error(function (data, status) {

                    });
        };

        // Initialize the app
        $scope.reset = function () {
            $scope.ideaList = [];
            $scope.newIdea = {};
        };
        $scope.reset();
        $scope.loadObject();

        $scope.saveIdea = function () {
            $scope.ideaList.push($scope.newIdea);
            $scope.newIdea = {};
        };

        $scope.submitIdeas = function () {
            var ideaJson = angular.toJson($scope.ideaList);

            // Post to server:
            $http.post(
                    serviceUrl + 'twenty_record',
                    {
                        user_id: 2,
                        object_id: $scope.object.id,
                        content: ideaJson
                    })
                    .success(function (data, status, headers, config) {
                        // Submit success. Show notification. Clear every thing.
                        $scope.reset();
                        $scope.loadObject();
                    }).
                    error(function (data, status, headers, config) {
                        // Show error.
                    });
        };
    }]);
twentyApp.controller('DiscoverCtrl', [ '$scope', '$http', function($scope, $http){
//    $scope.discover = new TwentyRecord();
    $scope.recordList = [];
    $scope.busy = false;
    $scope.offset = 0;
    $scope.stop = false;
    
    $scope.nextPage = function(){
        if ($scope.busy) return;
        $scope.busy = true;
        
        var url = serviceUrl + 'twenty_record?limit=6&offset='+ String(this.offset)+'';
        $http.get(url)
                .success(function(data){
                    console.log(data);
                    for(var i=0; i<data.length; i++){
                        $scope.recordList.push(data[i]);
                    }
                    $scope.offset ++;
                    $scope.busy = false;
                    if (data.length < 6){
                        $scope.stop = true;
                    }
        }).error(function (data) {
            $scope.stop = true;
            $scope.busy = false;
        });
    };
}]);