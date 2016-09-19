"use strict"

app.controller("PartyCtrl", function($scope, currentParty, $routeParams){

  $scope.title = "This time let's party for real this time"
  $scope.party = currentParty



  $scope.invitedCount = Object.keys(currentParty.invited || {}).length
  $scope.attendingCount = Object.keys(currentParty.attending || {}).length
  $scope.declinedCount = Object.keys(currentParty.declined || {}).length

})