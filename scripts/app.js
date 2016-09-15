"use strict"

var app = angular.module("StartAParty", ["ngRoute", 'uiGmapgoogle-maps'])
    .constant("FirebaseURL", "https://start-a-party.firebaseio.com/")

app.config(function($routeProvider){
  $routeProvider

  .when("/", {
    redirectTo: "/login"
    })
  .when("/login", {
    templateUrl: "partials/login.html",
    controller: "LoginCtrl",
    redirectAuth: "/profile"
  })
  .when("/profile", {
    templateUrl: "partials/profile.html",
    controller: "ProfileCtrl",
    requireAuth: true
  })
  .when("/pressthebutton", {
    templateUrl: "partials/pressthebutton.html",
    controller: "PressTheButtonCtrl",
    requireAuth: true
  })
  .when("/geolocate", {
    templateUrl: "partials/geolocate.html",
    controller: "GeoLocateCtrl",
    requireAuth: true
  })
  .when("/party-form", {
    templateUrl: "partials/party-form.html",
    controller: "StartAPartyCtrl",
    requireAuth: true
  })
  .when("/my-profile", {
    templateUrl: "partials/my-profile.html",
    controller: "MyProfileCtrl",
    requireAuth: true
  })
  .otherwise("/");

});

app.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyB7gLjZhbyownAb4bBq6eHZ85jQFP36Rr8',
    v: '3.20',
    libraries: 'weather,geometry,visualization'
  })
})



app.run(($location, FBCreds) => {
  let creds = FBCreds
  let authConfig = {
    apiKey: creds.apiKey,
    authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig)
});

// requireAuth helper
app.run(function($rootScope, $location, AuthFactory) {
  $rootScope.$on("$routeChangeStart", (evt, next, curr) => {
    if (!next.$$route || !next.$$route.requireAuth) return
    if (AuthFactory.isAuthenticated()) return
    $location.path("/login")

  })
})

// redirectAuth helper
app.run(function($rootScope, $location, AuthFactory) {
  $rootScope.$on("$routeChangeStart", (evt, next, curr) => {
    if (!next.$$route || !next.$$route.redirectAuth) return
    if (!AuthFactory.isAuthenticated()) return
    $location.path(next.$$route.redirectAuth)

  })
})

