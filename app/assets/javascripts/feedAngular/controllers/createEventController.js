'use strict'

var feedControllers = angular.module('feedControllers');

//TODO create service to put shared data
// Controller of the pop up to create a new event
feedControllers.controller('createEventController', ['$scope', '$http',
  function($scope, $http) {

    $scope.getFeedScope = function() {
         return $scope.$parent.getFeedScope();
    };

      // Initialisation of all event characteristics
      $scope.event = {
        "sport": "",
        "date": "",
        "start_time": "16:00",
        "end_time": "17:00",
        "university_location": "",
        "location": "Hyde Park Tennis Courts",
        "needed": 1,
        "additional_info": "Bring a racket"
      };

      // Creating a new event
      $scope.createEvent = function() {
        $http({
          method: 'POST',
          url: '/events.json',
          data: $scope.event
        }).then(function(response) {
          $scope.getFeedScope().getEvents();
        },
        function(response) {
          // TODO: Error handling to do
          alert("Failed to add events");
        });
      };

      $scope.creationSportSelected = function (selectedInfo) {
          if(selectedInfo != undefined) {
            $scope.event.sport = selectedInfo.title;
          }
      };

      $scope.creationLocationSelected = function (selectedInfo) {
          if(selectedInfo != undefined) {
            $scope.event.university_location = selectedInfo.title;
          }
      };

      $('#creationDatePicker').datepicker().on('clearDate', function(e) {
        $scope.$apply(function () {$scope.event.date = "";});
      });
}]);
