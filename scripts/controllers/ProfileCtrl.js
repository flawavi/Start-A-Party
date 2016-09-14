"use strict"

app.controller("ProfileCtrl", function($scope){

  $scope.title = "Create a profile"

  $scope.newUserProfile = {
    name: "",
    userName: "",
    city: "",
    age: ""
  }

    $scope.createProfile = function(){
    // ItemStorage.postNewItem($scope.newUserProfile)
    // .then(function() {
    //   //use locatino to pass in route back to items list
    //   $location.url("/items/list");
    // });
  };

})