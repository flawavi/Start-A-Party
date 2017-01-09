"use strict"

app.controller("ProfileCtrl", function(
  $scope,
  $window,
  $location,
  currentUser,
  ProfileFactory
){

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
      $window.location.reload()
    })
  }

})
