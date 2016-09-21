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

const currentParty = ($route, PartyFactory) => {
  return PartyFactory.getPartyById($route.current.params.id)
}
const currentProfile = ($route, AuthFactory, ProfileFactory) => {
  return AuthFactory.currentUser().then(user => {

    return ProfileFactory.getProfileById(user.uid)
  })
}

const ownerParties = (AuthFactory, PartyFactory) => {
  return AuthFactory.currentUser().then(user => {
    return PartyFactory.getPartiesByOwner(user.uid)
  })
}

app.config(function($routeProvider){
  $routeProvider
  .when("/", {
    redirectTo: "/login"
  })
  .when("/login", {
    templateUrl: "partials/login.html",
    controller: "LoginCtrl",
    redirectAuth: "/my-profile",
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
  .when("/geolocate/:id", {
    templateUrl: "partials/geolocate.html",
    controller: "GeoLocateCtrl",
    resolve: {
      currentUser,
      requireCurrentUser,
      currentParty
    }
  })
  .when("/party-form", {
    templateUrl: "partials/party-form.html",
    controller: "StartAPartyCtrl",
    resolve: {
      currentUser,
      requireCurrentUser
    }
  })
  .when("/my-profile", {
    templateUrl: "partials/my-profile.html",
    controller: "MyProfileCtrl",
    resolve: {
      currentUser,
      requireCurrentUser,
      currentProfile,
      ownerParties
    }
  })
  .when("/my-profile/:profileId", {
    templateUrl: "partials/my-profile.html",
    controller: "MyProfileCtrl"
  })
  .when("/invite/:id", {
    templateUrl: "partials/invitation.html",
    controller: "InvitationCtrl",
    resolve: {
      currentUser,
      requireCurrentUser,
      currentParty,
      currentProfile
    }
  })
  .when("/party/:id", {
    templateUrl: "partials/party.html",
    controller: "PartyCtrl",
    resolve: {
      currentUser,
      requireCurrentUser,
      currentParty,
      currentProfile
    }
  })
  .otherwise("/")
})

app.config(function(uiGmapGoogleMapApiProvider) {
  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyB7gLjZhbyownAb4bBq6eHZ85jQFP36Rr8',
    v: '3.25',
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

//sentinel
app.run(function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", (evt, curr, prev, err) => {
    if (!err || err.message !== 'NO_CURRENT_USER') return
    $location.path("/login")
  })
})

app.run(function($rootScope, $location) {
  $rootScope.$on("$routeChangeError", (evt, curr, prev, err) => {
    if (!err || err.message !== 'CURRENT_USER') return

    if (!curr.$$route || !curr.$$route.redirectAuth) return
    $location.path(curr.$$route.redirectAuth)
  })
})