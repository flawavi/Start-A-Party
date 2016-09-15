"use strict"

app.controller("MyProfileCtrl", function($scope, $location, ProfileFactory) {

  $scope.title = "My Profile"

    $scope.newUserProfile = {
    name: "",
    userName: "",
    city: "",
    age: "",
    userId: $scope.$parent.getUser()
  }

  ProfileFactory.getProfile($scope.newUserProfile.userId)

  $scope.editProfile = () => {
    console.log("edit profile button clicked")
    ProfileFactory.patchProfile($scope.newUserProfile)
    .then(() => {
      console.log($scope.newUserProfile, "edited profile")
      $location.url("profile")
    })
  }


})