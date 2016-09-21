"use strict"

app.controller("ProfileCtrl", function($scope, ProfileFactory, $location, currentUser){


  $scope.title = "Create a Party Profile"

  $scope.newUserProfile = {
    name: "",
    userName: "",
    city: "",
    age: ""
  }

  $scope.createProfile = () => {

    ProfileFactory.postProfile($scope.newUserProfile)
    .then(() => {

      $location.url("/my-profile")
    })
  }

})