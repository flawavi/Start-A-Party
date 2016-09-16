"use strict"

app.controller("InvitationCtrl", function($scope, AuthFactory, PartyFactory, ProfileFactory) {
  $scope.message = "Who gon' be @ dis pardee??"

  $scope.invitation = {
    guests: [],
    greeting: ", you're invited to my party! click for details!",
    coords: ""
  }

})