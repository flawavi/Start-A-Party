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
    ProfileFactory.createProfile($scope.newUserProfile)
    .then(function() {
      console.log($scope.newUserProfile, "newUserProfile")
      $location.url("/startaparty");
    });
  };

})