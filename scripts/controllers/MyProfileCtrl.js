"use strict"

app.controller("MyProfileCtrl", function($scope, $location, ProfileFactory, AuthFactory) {

  $scope.title = "My Profile"
  console.log('TESTING', ProfileFactory.getProfiles());

    $scope.newUserProfile = {
    name: "",
    userName: "",
    city: "",
    age: "",
    userID: null
  }

  $scope.editProfile = () => {
    console.log("edit profile button clicked")
    ProfileFactory.patchProfile($scope.newUserProfile)
    .then(() => {
      console.log($scope.newUserProfile, "edited profile")
      $location.url("profile")
    })
  }

})