"use strict"

app.controller("StartAPartyCtrl", function($scope, $location, uiGmapGoogleMapApi, PartyFactory){

  $scope.map = { center: { latitude: 36.1627, longitude: -86.7816 }, zoom: 8}
  $scope.title = "Party Details"
  $scope.newParty = {

    hostName: "",
    theme: "",
    finishTime: "",
    occasion: "",
    location: ""

  }

  $scope.startParty = () => {
    console.log("party party party")
    PartyFactory.postParty($scope.newParty)
    .then(function() {
      console.log($scope.newParty, "newParty")
      $location.url("/geolocate")
    })
  }

})

