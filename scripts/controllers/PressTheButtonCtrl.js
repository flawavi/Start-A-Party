"use strict"

app.controller("PressTheButtonCtrl", function($scope){

  $scope.message = "Go on, press me."

  $scope.findGPS = () => {
    console.log("are we working?")
  }

});

