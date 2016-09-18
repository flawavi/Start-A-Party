"use strict"

app.controller("MyProfileCtrl", function($scope, $location, ProfileFactory, AuthFactory) {

  $scope.title = "My Profile"

    $scope.newUserProfile = {
    name: "",
    userName: "",
    city: "",
    age: ""
  }

  $scope.profileID = AuthFactory.getUser().uid

  ProfileFactory.getProfileById($scope.profileID)
    .then(response => {
      for (var key in response) {
        console.log(response[key], "responseKey")
        $scope.newUserProfile = response[key];
      }
    });

  $scope.deleteProfile = () => {
    console.log("delete button clicked")
    ProfileFactory.deleteProfile($scope.profileID)
    ProfileFactory.getProfileById($scope.profileID)
    .then(response => {
      for (var key in response) {
        console.log(response[key], "responseKey")
        $scope.newUserProfile = response[key];
      }
    });
  }

  $scope.editProfile = () => {
    console.log("edit profile button clicked")
    ProfileFactory.patchProfile($scope.newUserProfile)
    .then(() => {
      console.log($scope.newUserProfile, "newUserProfile")
      $location.url("profile")
    })
  }


})