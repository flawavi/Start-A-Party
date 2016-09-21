"use strict"

app.controller("StartAPartyCtrl", function($scope, $location, uiGmapGoogleMapApi, PartyFactory){

  $scope.title = "Party Details"


  $scope.newParty = {

    partyName: "",
    hostName: "",
    theme: "",
    finishTime: "",
    occasion: "",
    location: ""

  }

  $scope.startParty = () => {
    PartyFactory.postParty($scope.newParty)
    .then(party => {
      $location.url(`/geolocate/${party.name}`)
    })
  }

})

