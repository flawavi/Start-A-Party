"use strict"

app.controller("InvitationCtrl", function($scope, AuthFactory, PartyFactory, ProfileFactory) {
  $scope.message = "Who gon' be @ dis pardee??"

  $scope.guests = ["jamie fox", "jammy fawx", "jermy fulks"]
  $scope.greeting = ", you're invited!"

})