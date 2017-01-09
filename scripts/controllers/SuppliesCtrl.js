"use strict"

app.controller("SuppliesCtrl", function($scope, $location, $q, $routeParams, SuppliesFactory, currentParty, currentUser, currentProfile){

  $scope.title = "Supplies"
  $scope.supplies = {
    beer: null,
    wine: null,
    liquor: null,
    cordials: null,
    water: null,
    soda: null,
    juice: null,
    mixers: null,
    chips: null,
    burgers: null,
    buns: null,
    condiments: null,
    veggies: null,
    fruit: null,
    cookies: null,
    nuts: null,
    speakers: null,
    turntables: null,
    records: null,
    mp3: null,
    power: null,
    mics: null,
    cables: null,
    balloons: null,
    streamers: null,
    hats: null,
    decals: null

  }

  $scope.postSupplies = () => {
    console.log("clicked postSupplies")
    SuppliesFactory.postSupplies($scope.supplies, $routeParams.id)
      .then(()=> {
        $location.url("/party")
      })
  }

  SuppliesFactory.getSupplies()
  .then(()=>{
    console.log("hello?")
  })

})