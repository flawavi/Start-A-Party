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

 ProfileFactory.getProfileById($routeParams.profileId)
  .then(response => {
 console.log($routeParams.profileId)
    $scope.newUserProfile = response;
  });

  $scope.editProfile = () => {
    console.log("edit profile button clicked")
    ProfileFactory.patchProfile($scope.newUserProfile)
    .then(() => {
      console.log($scope.newUserProfile, "newUserProfile")
      $location.url("profile")
    })
  }


})