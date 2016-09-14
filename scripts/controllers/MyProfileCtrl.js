"use strict"

app.controller("MyProfileCtrl", function($scope, $location, ProfileFactory) {

  $scope.title = "My Profile"

  $scope.editProfile = () => {
    console.log("edit profile button clicked")
    ProfileFactory.patchProfile($scope.newUserProfile)
    .then(() => {
      console.log($scope.newUserProfile, "edited profile")
      $location.url("profile")
    })
  }


})