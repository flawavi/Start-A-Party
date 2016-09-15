"use strict"

app.controller("ProfileCtrl", function($scope, ProfileFactory, $location, currentUser){
  console.log(currentUser, "CURRENTUSER")

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
      $location.url("/party-form")
    })
  }

  $scope.editProfile = () => {
    console.log("edit profile button clicked")
    ProfileFactory.patchProfile($scope.newUserProfile)
    .then(() => {
      console.log($scope.newUserProfile, "edited profile")
      $location.url("profile")
    })
  }

  $scope.getProfileFromFirebase = () => {
    console.log('TESTING', ProfileFactory.getProfile());
  }

})