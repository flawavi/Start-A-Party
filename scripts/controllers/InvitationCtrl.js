"use strict"

app.controller("InvitationCtrl", function(
  $scope,
  $location,
  AuthFactory,
  PartyFactory,
  currentParty,
  $routeParams,
  ProfileFactory
  )
{
  // $scope.searchText = SearchProfiles;

  console.log(currentParty)
  $scope.message = "Who gon' be @ dis pardee??"
  $scope.userName = ""
  $scope.inviteeID = null

  $scope.inviteeInfo = {}

  $scope.findUser = () => {
    ProfileFactory.getProfileByUserName($scope.userName)
      .then(response => {
        $scope.name = "Name: "
        $scope.user = "Username: "
        $scope.location = "City: "
        $scope.age = "Age: "
        $scope.inviteeID = Object.keys(response)[0]
        $scope.inviteeInfo = response[$scope.inviteeID]
        $scope.name = ""
        $scope.user = ""
        $scope.location = ""
        $scope.age = ""
      })
  }
  $scope.sendInvite = () => {
    PartyFactory.postPartyGuest(
      $routeParams.id,
      $scope.inviteeID,
      $scope.userName,
      "invited"
      ).then(()=> {
        ProfileFactory.postPartyInvite(
        $scope.inviteeID,
        $routeParams.id,
        currentParty.partyName,
        "invited"
      ).then(()=> {
        $scope.inviteeID = null
        $scope.inviteeInfo = {}
        $scope.userName = ""
      })
    })
  }

  $scope.done = () => {
    $location.url(`/party/${$routeParams.id}`)
  }


})

