"use strict"

app.controller("MyProfileCtrl", function($scope, $location, $routeParams, ProfileFactory, AuthFactory) {

  $scope.title = "My Profile"
  console.log('TESTING', ProfileFactory.getProfiles());

    $scope.newUserProfile = {
    name: "",
    userName: "",
    city: "",
    age: ""
  }

  $scope.editProfile = () => {
    console.log("edit profile button clicked")
    ProfileFactory.patchProfile($scope.newUserProfile)
    .then(() => {
      console.log($scope.newUserProfile, "edited profile")
      $location.url("profile")
    })
  }

 ProfileFactory.getProfileById($routeParams.profileId)
  .then(response => {
    $scope.newUserProfile = response;
  });

})