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

  $scope.title = "Profile"
  $scope.parties = "Parties"
  $scope.profile = currentProfile

  $scope.ownerParties = ownerParties


  $scope.deleteProfile = () => {

    ProfileFactory.deleteProfile($scope.profileID)
    ProfileFactory.getProfileById($scope.profileID)
    .then(response => {
      for (var key in response) {

        $scope.newUserProfile = response[key];
      }
    });
  }

  $scope.editProfile = () => {

    ProfileFactory.patchProfile($scope.newUserProfile)
    .then(() => {

      $location.url("profile")
    })
  }

  $scope.goToPartyForm = () => {
    $location.url("party-form")
  }


})