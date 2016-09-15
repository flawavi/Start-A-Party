"use strict"

const app = angular.module("StartAParty", ["ngRoute", 'uiGmapgoogle-maps'])
  .constant("FirebaseURL", "https://start-a-party.firebaseio.com/")

const currentUser = AuthFactory => AuthFactory.currentUser()

const requireCurrentUser = AuthFactory => AuthFactory.currentUser().then(user => {
  if (!user) throw new Error('NO_CURRENT_USER')
})

const redirectCurrentUser = AuthFactory => AuthFactory.currentUser().then(user => {
  if (user) throw new Error('CURRENT_USER')
})

app.config(function($routeProvider){
  $routeProvider
  .when("/", {
    redirectTo: "/login"
  })
  .when("/login", {
    templateUrl: "partials/login.html",
    controller: "LoginCtrl",
    redirectAuth: "/profile",
    resolve: {
      redirectCurrentUser
    }
  })
  .when("/profile", {
    templateUrl: "partials/profile.html",
    controller: "ProfileCtrl",
    resolve: {
      currentUser,
      requireCurrentUser
    }
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
  .otherwise("/")
})

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
  }
  firebase.initializeApp(authConfig)
})

app.run(function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", (evt, curr, prev, err) => {
    if (!err || err.message !== 'NO_CURRENT_USER') return
    $location.path("/login")
  })
})

app.run(function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", (evt, curr, prev, err) => {
    if (!err || err.message !== 'CURRENT_USER') return
    console.log('DAFUQ', curr, prev, err)
    if (!curr.$$route || !curr.$$route.redirectAuth) return
    $location.path(curr.$$route.redirectAuth)
  })
})