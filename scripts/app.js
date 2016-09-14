"use strict"

var app = angular.module("StartAParty", ["ngRoute", 'uiGmapgoogle-maps'])
    .constant("FirebaseURL", "https://start-a-party.firebaseio.com/");//definig a variable called Firebase with a value of a specific URL

// let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
// //isAuthenticated returns a boolean
//   if (AuthFactory.isAuthenticated()) {
//     resolve();
//   } else {
//     reject();
//   }
// });

app.config(function($routeProvider){
    $routeProvider
        //when arrived at site for first time, go to login
        .when("/", {
          templateUrl: "partials/login.html",
          controller: "LoginCtrl"
        })
        //when login link clicked, also send to login
        .when("/login", {
          templateUrl: "partials/login.html",
          controller: "LoginCtrl"
        })
        //templateUrl - the U is big, the rl are not!
        .when("/profile", {
            templateUrl: "partials/profile.html",
            controller: "ProfileCtrl",
            // resolve: {isAuth}
        })
        .when("/startaparty", {
            templateUrl: "partials/party.html",
            controller: "StartAPartyCtrl"
            // resolve: {isAuth}
        })
        .when("/pressthebutton", {
            templateUrl: "partials/pressthebutton.html",
            controller: "PressTheButtonCtrl"
            // resolve: {isAuth}
        })
        .when("/geolocate", {
            templateUrl: "partials/geolocate.html",
            controller: "GeoLocateCtrl"
            // resolve: {isAuth}
        })
        .otherwise("/");

});

app.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyB7gLjZhbyownAb4bBq6eHZ85jQFP36Rr8',
    v: '3.20', //defaults to latest 3.X anyhow
    libraries: 'weather,geometry,visualization'
  });
})



app.run(($location, FBCreds) => {
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.apiKey,
    authDomain: creds.authDomain
    };
    firebase.initializeApp(authConfig);
});

