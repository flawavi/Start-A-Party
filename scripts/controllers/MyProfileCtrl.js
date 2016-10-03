"use strict"

app.controller("MyProfileCtrl", function(
  $scope,
  $location,
  AuthFactory,
  ownerParties,
  ProfileFactory,
  currentProfile
  ){


  $scope.invitedCount = Object.keys(currentProfile.invited || {}).length
  $scope.attendingCount = Object.keys(currentProfile.attending || {}).length
  $scope.declinedCount = Object.keys(currentProfile.declined || {}).length

  $scope.title = "Profile"
  $scope.parties = "Parties"
  $scope.profile = currentProfile
  $scope.ownerParties = ownerParties

  $scope.deleteProfile = () => {
    alert("Are you sure you want to delete your profile?")
    ProfileFactory.deleteProfile($scope.profile.id)
    .then(()=>{
      console.log("profile deleted")
      $location.url("/profile")
    })
  }

  $scope.goToPartyForm = () => {
    $location.url("party-form")
  }

  // $scope.editProfile = () => {
  //   ProfileFactory.patchProfile($scope.newUserProfile)
  //   .then(() => {
  //     $location.url("profile")
  //   })
  // }
})