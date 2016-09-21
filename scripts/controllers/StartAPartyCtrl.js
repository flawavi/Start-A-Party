"use strict"

app.controller("StartAPartyCtrl", function($scope, $location, uiGmapGoogleMapApi, PartyFactory){

  $scope.title = "Party Details"

  $scope.map = {
    center:
    {
      latitude: 36.1627, longitude: -86.7816
    },
    zoom: 8}


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

