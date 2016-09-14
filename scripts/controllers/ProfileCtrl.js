"use strict"

app.controller("ProfileCtrl", function($scope, ProfileFactory, $location){

  $scope.title = "Create a profile"

  $scope.newUserProfile = {
    name: "",
    userName: "",
    city: "",
    age: ""
  }

    $scope.createProfile = () => {
      console.log("create profile hello")
    ProfileFactory.postProfile($scope.newUserProfile)
    .then(() => {
      console.log($scope.newUserProfile, "newUserProfile")
      $location.url("/party-form");
    });
  };

})