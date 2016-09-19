"use strict"

app.controller("MyProfileCtrl", function(
  $scope,
  $location,
  AuthFactory,
  ownerParties,
  ProfileFactory,
  currentProfile
  )
{

  $scope.invitedCount = Object.keys(currentProfile.invited || {}).length
  $scope.attendingCount = Object.keys(currentProfile.attending || {}).length
  $scope.declinedCount = Object.keys(currentProfile.declined || {}).length

  $scope.title = "My Profile"
  $scope.profile = currentProfile

  $scope.ownerParties = ownerParties
  console.log(currentProfile)

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